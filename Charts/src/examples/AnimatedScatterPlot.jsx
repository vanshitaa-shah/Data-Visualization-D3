import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  axisBottom,
  axisLeft,
  easeBackOut,
  easeBounceIn,
  easeElastic,
  easeLinear,
  transition,
} from "d3";
const AnimatedScatterPlot = () => {
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
  const margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 50,
  };
  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const t = transition().duration(2000).ease(d3.easeLinear);

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
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
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

      // Axis
      const y_axis = svg
        .selectAll(".y_axis")
        .data([null])
        .join("g")
        .classed("y_axis", true)
        .attr("transform", `translate(${margin.left},0)`)
        .call(axisLeft(yScale));

      // y_axis
      //   .append("text")
      //   // .attr("transform", "rotate(-90)")
      //   // .attr("text-anchor", "end")
      //   .text(selectedProperty);

      const x_axis = svg
        .selectAll(".x_axis")
        .data([null])
        .join("g")
        .classed("x_axis", true)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisBottom(xScale));

      x_axis.transition().duration(2000).call(d3.axisBottom(xScale));

      const marks = data.map((d) => ({
        x: xScale(xValue(d)), // You can customize this based on your preference
        y: yScale(yValue(d)),
        title: `(${xValue(d)}, ${yValue(d)})`,
      }));

      svg.selectAll("*").interrupt();
      // Rendering

      const circles = svg
        .selectAll("circle")
        .data(marks)
        .join(
          (enter) =>
            enter
              .append("circle")
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y)
              .attr("r", 0)
              .call((enter) => enter.transition(t).attr("r", 4)),
          (update) =>
            update
              .call((update) => update.transition(t).delay((d, i) => i * 10))
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y),
          (exit) => exit.remove()
        )
        .attr("fill", "purple");

      circles.append("title").text((d) => d.title);

      // d3.select("#textt")
      //   .append("text")
      //   .text("adasd")
      //   .attr("y", 2)
      //   .attr("dy", "1.2em")
      //   .attr("dx", width / 2 - margin.left)
      //   .attr("text-anchor", "start");
    };

    getData();

    // Set an interval to change the property every 2 seconds
    const propertyChangeInterval = setInterval(() => {
      getNextProperty();
      getData();
    }, 5000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(propertyChangeInterval);
      svg.remove();
    };
  }, [propertyIndex]);

  return (
    <>
      <div id="irisScatterChart"></div>
    </>
  );
};

export default AnimatedScatterPlot;
