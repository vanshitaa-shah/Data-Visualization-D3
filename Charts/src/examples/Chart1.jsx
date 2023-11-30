import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

//simple bar chart using D3

// variables and constants
const w = 250;
const h = 200;

const Chart1 = () => {
  const myRef = useRef();

  useEffect(() => {
    const accessToRef = d3
      .select(myRef.current)
      .append("svg")
      .attr("height", h)
      .attr("width", w)
      .style("background-color", "#cccccc")
      .style("padding", 10)
      .style("margin-left", 10);

    accessToRef
      .selectAll("rect")
      .data([10, 55, 25, 5, 30])
      .join("rect")
      .attr("x", (d, i) => i * 45)
      .attr("width", 40)
      .attr("fill", "tomato")
      .attr("y", function () {
        return h;
      })
      .attr("height", 0)
      .transition()
      .duration(800)
      .attr("y", (d, i) => h - 3 * d)
      .attr("height", (d, i) => d * 3);

    //prevents repeatation , removes previous instance
    return () => accessToRef.remove();
  }, []);

  return <div ref={myRef}></div>;
};

export default Chart1;
