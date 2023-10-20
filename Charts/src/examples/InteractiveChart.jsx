import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";
import { useState } from "react";

//Used events,scales, axis
const interactiveChart = () => {
  const data = [
    { id: "d1", region: "USA", value: 10 },
    { id: "d2", region: "India", value: 12 },
    { id: "d3", region: "China", value: 5 },
    { id: "d4", region: "Germany", value: 16 },
  ];

  const MARGINS = { top: 10, bottom: 10, left: 20, right: 10 };
  const CHART_WIDTH = 300;
  const CHART_HEIGHT = 250 - MARGINS.top - MARGINS.bottom;

  let [selectedData, setSelectedData] = useState(data);

  //x-scale for width of bars
  const x = d3.scaleBand().rangeRound([MARGINS.left, CHART_WIDTH]).padding(0.1);

  //y-scale for height of bars
  const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);
  //domains- which data should be scaled
  x.domain(data.map((d) => d.region)); //strings

  y.domain([0, d3.max(data, (d) => d.value) + 3]);

  useEffect(() => {
    //chart container
    const chartContainer = d3
      .select("#chart")
      .append("svg")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT + MARGINS.bottom + MARGINS.top);

    const chart = chartContainer.append("g");

    //bars
    chart
      .selectAll(".bar")
      .data(selectedData)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", x.bandwidth())
      .attr("x", (d) => x(d.region))
      .attr("y", function () {
        return CHART_HEIGHT;
      })
      .attr("height", 0)
      .transition()
      .duration(800)
      .attr("height", (d) => CHART_HEIGHT - y(d.value))
      .attr("y", (d) => y(d.value));

    //remove bars

    // chart.selectAll(".bar").data(selectedData).exit().attr("fill", "red");

    //labels above bars
    chart
      .selectAll(".lable")
      .data(selectedData)
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("x", (d) => x(d.region) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 20)
      .attr("text-anchor", "middle")
      .classed("label", true);

    //remove labels

    // chart.selectAll(".label").data(selectedData).exit().remove();

    //x-axis with labels below bars
    chart
      .append("g")
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr("transform", `translate(0,${CHART_HEIGHT})`)
      .attr("color", "#4f009f");

    chart
      .append("g")
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .attr("transform", `translate(${MARGINS.left},0)`)
      .attr("color", "#4f009f");

    return () => chartContainer.remove();
  }, [selectedData]);

  useEffect(() => {
    let unselectedRegions = [];
    const listItems = d3
      .select("#data")
      .select("ul")
      .selectAll("li")
      .data(data)
      .enter()
      .append("li");

    listItems.append("span").text((d) => d.region);

    listItems
      .append("input")
      .attr("type", "checkbox")
      .attr("checked", true)
      .on("change", (e) => {
        let d = e.target.__data__;
        if (unselectedRegions.indexOf(d.id) === -1) {
          unselectedRegions.push(d.id);
          console.log(unselectedRegions);
        } else {
          unselectedRegions = unselectedRegions.filter((id) => d.id !== id);
          console.log(unselectedRegions);
        }

        setSelectedData(
          data.filter((d) => unselectedRegions.indexOf(d.id) === -1)
        );
        console.log(selectedData);
      });
  }, []);

  return (
    <>
      <div id="app">
        <div id="chart"></div>
        <div id="data">
          <ul></ul>
        </div>
      </div>
    </>
  );
};

export default interactiveChart;
