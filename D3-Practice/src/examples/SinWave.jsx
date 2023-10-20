import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const SinWave = () => {
  const height = innerHeight;
  const width = innerWidth;

  useEffect(() => {
    const svg = d3
      .select("#sinWave")
      .append("svg")
      .attr("height", height)
      .attr("width", width);
    let t = 0;
    setInterval(() => {
      const data = d3.range(15).map((d) => ({
        cx: d * 30 + 50,
        cy: 250 + Math.sin(d * 0.5 + t) * 100,
      }));

      //   const circles = svg.selectAll("circle").data(data);

      //   const enterSelection = circles.enter().append("circle").attr("r", 5);

      //   circles
      //     .merge(enterSelection)
      //     .attr("cx", (d) => d.cx)
      //     .attr("cy", (d) => d.cy);

      const circles = svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 5)
        .attr("cx", (d) => d.cx)
        .attr("cy", (d) => d.cy);

      t = t + 0.9;
    }, 1000);
  }, []);
  return <div id="sinWave"></div>;
};

export default SinWave;
