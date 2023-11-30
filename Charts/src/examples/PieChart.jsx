import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const PieChart = () => {
  const piedata = [
    { title: "chrome", value: 40 },
    { title: "safari", value: 50 },
    { title: "IE", value: 80 },
    { title: "Firefox", value: 30 },
  ];

  // Calculate the total value of all data points
  const total = piedata.reduce((sum, d) => sum + d.value, 0);

  // Calculate the fractions of the whole
  const dataWithFractions = piedata.map((d) => ({
    ...d,
    fraction: (d.value / total) * 100,
  }));

  const colors = ["red", "purple", "yellow", "green"];
  const innerRadius = 20;
  const outerRadius = 100;

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const popupArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius + 10);
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.fraction); // Use the fractions

  useEffect(() => {
    const svg = d3
      .select("#pieContainer")
      .append("svg")
      .attr("height", 300)
      .attr("width", 300)
      .style("background-color", "#eeeeee");

    const arcGroup = svg.append("g").attr("transform", "translate(150,150)");

    const arcs = arcGroup
      .selectAll(".arc")
      .data(pie(dataWithFractions))
      .enter()
      .append("g")
      .classed(".arc", true);

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i])
      .transition()
      .duration(1000)
      //Tween function
      .attrTween("d", function (d) {
        var i = d3.interpolate(d.endAngle, d.startAngle);
        return function (t) {
          d.startAngle = i(t);
          return arc(d);
        };
      });

    arcs.append("title").text((d) => `${d.data.title}`);
    arcs
      .append("text")
      .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.fraction.toFixed(2)}%`);

    arcs.on("mouseover", function (d) {
      const arcPath = d3.select(this).select("path");
      arcPath.attr("d", (d) => popupArc(d));

      // Add a border to the scaled part
      arcPath
        .attr("stroke", "White") // Border color
        .attr("stroke-width", 1); // Border width
    });
    arcs.on("mouseout", function (d) {
      const arcPath = d3.select(this).select("path");
      arcPath.attr("d", arc);

      // Remove the border when the mouse leaves
      arcPath.attr("stroke", "none"); // Set stroke to "none" to remove the border
    });

    return () => svg.remove();
  }, []);
  return <div id="pieContainer"></div>;
};

export default PieChart;
