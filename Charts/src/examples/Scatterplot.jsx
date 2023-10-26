import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { extent, scaleLinear, svg } from "d3";

const Scatterplot = () => {
  const height = 400;
  const width = 450;
  const data = [
    { a: "5", b: "13" },
    { a: "4", b: "13" },
    { a: "2", b: "17" },
    { a: "1", b: "11" },
    { a: "7", b: "17" },
    { a: "8", b: "25" },
    { a: "8", b: "45" },
    { a: "8", b: "35" },
    { a: "4", b: "17" },
    { a: "3", b: "14" },
    { a: "7", b: "13" },
    { a: "9", b: "14" },
    { a: "1", b: "16" },
  ];

  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50,
  };

  const xvalue = (d) => d.b;
  const yvalue = (d) => d.a;

  //xScale
  const x = scaleLinear()
    .domain([d3.min(data, xvalue), d3.max(data, xvalue)])
    .range([margin.left, width - margin.right]);

  //yScale
  const y = scaleLinear()
    .domain(d3.extent(data, yvalue))
    .range([height - margin.top, margin.bottom]);

  //Data points array
  const marks = data.map((d) => ({
    x: x(xvalue(d)),
    y: y(yvalue(d)),
    title: `(${xvalue(d)}, ${yvalue(d)})`,
  }));

  console.log(marks);

  useEffect(() => {
    const svg = d3
      .select("#scatterChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //putting data points on chart
    const circles = svg
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5);

    circles.on("mouseover", function () {
      d3.select(this).attr("r", 7);
    });

    circles.on("mouseout", function () {
      d3.select(this).attr("r", 5);
    });

    circles.append("title").text((d) => d.title);
    //changing styles if a>5
    svg
      .selectAll("circle")
      .data(data)
      .style("fill", (d) => (d.a > 5 ? "green" : "red"));

    //y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    //x axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    return () => svg.remove();
  }, []);

  return <div id="scatterChart"></div>;
};

export default Scatterplot;
