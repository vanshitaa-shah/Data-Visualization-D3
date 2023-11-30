import * as d3 from "d3";
import { useEffect } from "react";

function A() {
  useEffect(() => {
    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", 200)
      .attr("height", 200);

    // Create a circle element
    const circle = svg
      .append("circle")
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("r", 50)
      .style("fill", "blue");

    circle.on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 30)
        .style("fill", "red");
    });

    circle.on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(1000)
        // .delay(1000)
        .attr("r", 50)
        .style("fill", "blue");
    });

    return () => svg.remove();
  }, []);

  return (
    <>
      <div className="chart"></div>
    </>
  );
}

export default A;
