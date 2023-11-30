import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { useRef } from "react";

// Variables and constants
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

const xvalue = (d) => d.a;
const yvalue = (d) => d.b;

// Define xScale to map data values to the x-axis coordinates
const xScale = d3
  .scaleLinear()
  .domain([d3.min(data, xvalue), d3.max(data, xvalue)])
  .range([margin.left, width - margin.right]);

// Define yScale to map data values to the y-axis coordinates
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, yvalue))
  .range([height - margin.top, margin.bottom]);

// Create an array of data points with x, y coordinates and titles for tooltips
const marks = data.map((d) => ({
  x: xScale(xvalue(d)),
  y: yScale(yvalue(d)),
  title: `(${xvalue(d)}, ${yvalue(d)})`,
}));

/*--------------- component --------------*/
const Scatterplot = () => {
  const scatterRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(scatterRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#eee");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Render data points as circles on the chart
    const circles = svg
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5);

    // Add titles (tooltips) to the circles
    circles.append("title").text((d) => d.title);

    circles.data(data).style("fill", (d) => (d.b > 20 ? "green" : "red"));

    // Event - increase circle radius on mouseover
    circles.on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 7)
        .style("fill", (d) => (d.b > 20 ? "lime" : "orange"));
    });

    // Event - Restore circle radius on mouseout
    circles.on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 5)
        .style("fill", (d) => (d.b > 20 ? "green" : "red"));
    });

    // Event - alert coordinates on click
    circles.on("click", function () {
      const dataPoint = d3.select(this).datum();
      alert(`hey you clicked on (${dataPoint.a}, ${dataPoint.b})`);
    });

    // Clean up the SVG when the component unmounts
    return () => svg.remove();
  }, []);

  return <div ref={scatterRef}></div>;
};

export default Scatterplot;
