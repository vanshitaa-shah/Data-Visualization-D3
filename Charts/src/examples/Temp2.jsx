import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const PieChart2 = () => {
  const height = 300;
  const width = 300;
  const piedata = [
    { title: "chrome", value: 40 },
    { title: "safari", value: 50 },
    { title: "IE", value: 80 },
    { title: "Firefox", value: 30 },
  ];
  const colors = ["orange", "lime", "cyan", "pink"];
  const innerRadius = 50;
  const outerRadius = 100;

  const total = piedata.reduce((acc, d) => acc + d.value, 0);
  const dataWithFraction = piedata.map((d) => ({
    ...d,
    fraction: (d.value / total) * 100,
  }));

  const colorScale = d3.scaleOrdinal().range(colors);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const pie = d3.pie().value((d) => d.fraction);

  useEffect(() => {
    const svg = d3
      .select("#pieChart-2")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "#eeeeee");

    const arcGroup = svg.append("g").attr("transform", `translate(150,150)`);

    const arcs = arcGroup
      .selectAll(".arc")
      .data(pie(dataWithFraction))
      .join("g")
      .classed(".arc", true);

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i])
      .transition()
      .duration(1000)
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

    return () => svg.remove();
  }, []);

  return <div id="pieChart-2"></div>;
};

export default PieChart2;
