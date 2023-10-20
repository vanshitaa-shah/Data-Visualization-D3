import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { scaleBand } from "d3";
function A() {
  //Drawing Bar Chart
  let width = 500;
  let height = 500;

  // let barWidth = 35;
  // let barOffSet = 5;

  useEffect(() => {
    const data = [
      { name: "pizza", count: 200 },
      { name: "sandwich", count: 100 },
      { name: "Pasta", count: 250 },
      { name: "Burger", count: 350 },
    ];

    // Scales
    const Xscale = d3
      .scaleBand()
      .rangeRound([30, width])
      .domain(data.map((i) => i.name))
      .padding(0.6);
    const Yscale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (x) => x.count + 15)])
      .range([height, 0]);

    //Add Axis
    const xAxis = d3.axisBottom(Xscale);
    const yAxis = d3.axisLeft(Yscale);
    // Create SVG element
    const chart = d3
      .select(".chart")
      .append("svg")
      .style("background", "#f4f4f4")
      .attr("width", width)
      .attr("height", height + 30);

    chart.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

    chart.append("g").attr("transform", `translate(30,0)`).call(yAxis);

    // Create bars
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "lightgreen")
      .attr("width", Xscale.bandwidth())
      .attr("height", (d) => height - Yscale(d.count))
      .attr("x", (d) => Xscale(d.name))
      .attr("y", (d) => Yscale(d.count));

    return () => {
      // Clean up: remove the chart when the component unmounts
      chart.remove();
    };
  }, []);
  return (
    <>
      {/* 
      <ul className='item'>
      <li>this is item</li>
      <li>this is item</li>
      <li>this is item</li>
      <li>this is item</li>
      <li>this is item</li>
     </ul> */}
      <div className="chart"></div>
    </>
  );
}

export default A;
