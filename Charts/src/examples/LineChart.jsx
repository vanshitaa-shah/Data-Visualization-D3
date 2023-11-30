import React, { useState } from "react";
import * as d3 from "d3";

//variables and constants
const initialData = [
  {
    name: "Car",
    value: 10,
  },
  {
    name: "Food",
    value: 3,
  },
  {
    name: "Telephone",
    value: 9,
  },
  {
    name: "Electricity",
    value: 7,
  },
  {
    name: "Cinema",
    value: 7,
  },
];

const width = 500;
const height = 150;
const padding = 20;
const maxValue = 20; // Maximum data value

const LineChart = () => {
  const [chartdata, setChartdata] = useState(initialData);

  return (
    <div id="lineChartContainer">
      <header className="header">
        <svg id="lineChart" viewBox="40 40 500 150">
          <circle cx="50" cy="50" r="20" stroke="black" fill="red"></circle>
          <p d="M50,50 L150,150" fill="none" stroke="white" strokeWidth="5"></p>
        </svg>
      </header>
    </div>
  );
};

export default LineChart;
