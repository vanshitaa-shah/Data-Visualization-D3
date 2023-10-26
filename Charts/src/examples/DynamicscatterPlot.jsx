// import React from "react";
// import * as d3 from "d3";
// import { useEffect } from "react";
// import { axisBottom, axisLeft } from "d3";

// const DynamicscatterPlot = () => {
//   const csvUrl = [
//     "https://gist.githubusercontent.com/", //Gist hosted url
//     "netj/", //user-name
//     "8836201/", //gist ID
//     "raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/", //commit
//     "iris.csv", //file name
//   ].join("");

//   const parseRow = (d) => {
//     d["sepal.length"] = +d["sepal.length"];
//     d["sepal.width"] = +d["sepal.width"];
//     d["petal.length "] = +d["petal.length"];
//     d["petal.width"] = +d["petal.width"];
//     return d;
//   };

//   const width = 500;
//   const height = 500;

//   const margin = {
//     top: 30,
//     right: 30,
//     bottom: 30,
//     left: 50,
//   };

//   const xValue = (d) => d["petal.length"];
//   const yValue = (d) => d["sepal.length"];

//   useEffect(() => {
//     const svg = d3
//       .select("#irisScatterChart")
//       .append("svg")
//       .attr("height", height)
//       .attr("width", width)
//       .style("background-color", "#eeeeee");

//     const getData = async () => {
//       const data = await d3.csv(csvUrl, parseRow);
//       //data Processing

//       const xScale = d3
//         .scaleLinear()
//         .domain(d3.extent(data, xValue))
//         .range([margin.left, width - margin.right]);

//       const yScale = d3
//         .scaleLinear()
//         .domain(d3.extent(data, yValue))
//         .range([height - margin.top, margin.bottom]);

//       const marks = data.map((d) => ({
//         x: xScale(xValue(d)),
//         y: yScale(yValue(d)),
//         title: `(${xValue(d)},${yValue(d)})`,
//       }));

//       //rendering
//       svg
//         .selectAll("circle")
//         .data(marks)
//         .join("circle")
//         .attr("cx", (d) => d.x)
//         .attr("cy", (d) => d.y)
//         .attr("r", 4)
//         .attr("fill", "purple")
//         .append("title")
//         .text((d) => d.title);

//       //axis
//       svg
//         .append("g")
//         .call(axisLeft(yScale))
//         .attr("transform", `translate(${margin.left},0)`)
//         .selectAll(".tick line")
//         .remove();

//       svg
//         .append("g")
//         .call(axisBottom(xScale))
//         .attr("transform", `translate(0,${height - margin.bottom})`);
//     };
//     getData();

//     return () => svg.remove();
//   }, []);
//   return <div id="irisScatterChart"></div>;
// };

// export default DynamicscatterPlot;

import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { axisBottom, axisLeft } from "d3";

const DynamicscatterPlot = () => {
  const [propertyIndex, setPropertyIndex] = useState(0);

  const csvUrl = [
    "https://gist.githubusercontent.com/", //Gist hosted url
    "netj/", //user-name
    "8836201/", //gist ID
    "raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/", //commit
    "iris.csv", //file name
  ].join("");

  const dataProperties = [
    "sepal.length",
    "sepal.width",
    "petal.length",
    "petal.width",
  ];
  const width = 500;
  const height = 500;

  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50,
  };

  const getNextProperty = () => {
    const nextIndex = (propertyIndex + 1) % dataProperties.length;
    // console.log(propertyIndex, nextIndex);
    setPropertyIndex(nextIndex);
    return dataProperties[nextIndex];
  };

  useEffect(() => {
    const svg = d3
      .select("#irisScatterChart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "#eeeeee");

    const getData = async () => {
      const data = await d3.csv(csvUrl, (d) => {
        d["sepal.length"] = +d["sepal.length"];
        d["sepal.width"] = +d["sepal.width"];
        d["petal.length"] = +d["petal.length"];
        d["petal.width"] = +d["petal.width"];
        return d;
      });

      const selectedProperty = dataProperties[propertyIndex];
      const xValue = (d) => d[selectedProperty];
      const yValue = (d) => d["sepal.length"];

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, xValue)) // You can customize this based on your preference
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([height - margin.top, margin.bottom]);

      const marks = data.map((d) => ({
        x: xScale(xValue(d)), // You can customize this based on your preference
        y: yScale(yValue(d)),
        title: `(${xValue(d)}, ${yValue(d)})`,
      }));

      // Rendering
      svg
        .selectAll("circle")
        .data(marks)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 4)
        .attr("fill", "purple")
        .append("title")
        .text((d) => d.title);

      // Axis
      svg
        .append("g")
        .call(axisLeft(yScale))
        .attr("transform", `translate(${margin.left},0)`)
        .selectAll(".tick line")
        .remove();

      svg
        .append("g")
        .call(axisBottom(xScale))
        .attr("transform", `translate(0,${height - margin.bottom})`);
    };

    getData();

    // Set an interval to change the property every 2 seconds
    const propertyChangeInterval = setInterval(() => {
      getNextProperty();
      getData();
    }, 2000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(propertyChangeInterval);
      svg.remove();
    };
  }, [propertyIndex]);

  return <div id="irisScatterChart"></div>;
};

export default DynamicscatterPlot;
