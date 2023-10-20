import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

const Chart2 = () => {
  useEffect(() => {
    const w = 250;
    const h = 200;
    const data = [10, 35, 25, 15, 30];

    const chartContainer = d3
      .select(".barChart")
      .append("svg")
      .attr("height", h)
      .attr("width", w)
      .style("background-color", "#cccccc")
      .style("padding", 10)
      .style("margin-left", 10);

    //bars
    chartContainer
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => i * 45)
      .attr("width", 40)
      .attr("y", function () {
        return h;
      })
      .attr("height", 0)
      .transition()
      .duration(800)
      .attr("y", (d, i) => h - 5 * d)
      .attr("height", (d, i) => d * 5)
      .attr("fill", (d) => (d > 15 ? "green" : "tomato"));

    //label text
    chartContainer
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 45 + 10)
      .attr("y", (d, i) => h - 5 * d - 10);

    return () => {
      // Clear the chart when the component unmounts
      // d3.select(".barChart").html("");
      chartContainer.remove();
    };
  }, []);
  return <div className="barChart"></div>;
};

export default Chart2;
