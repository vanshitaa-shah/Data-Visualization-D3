console.log(d3.select);
const width = innerWidth;
const height = innerHeight;

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

const mask = svg.append("mask").attr("id", "circle-mask");

/* Not Needed*/
// mask
//   .append("rect")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("fill", "black");

mask
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", 200)
  .attr("fill", "white");

const mask2 = svg.append("mask").attr("id", "circle-mask-2");

mask2
  .append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "white");

mask2
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", 200)
  .attr("fill", "black");

//classes approach to differentiate between horizontal-vertical rectangles
// svg
//   .selectAll(".horizontal")
//   .data(d3.range(100))
//   .enter()
//   .append("rect")
//   .attr("y", (d) => d * 20)
//   .attr("width", width)
//   .attr("height", 10)
//   .attr("class", "horizontal")
//   .attr("mask", "url(#circle-mask)");

// svg
//   .selectAll(".vertical")
//   .data(d3.range(100))
//   .enter()
//   .append("rect")
//   .attr("x", (d) => d * 20)
//   .attr("width", 10)
//   .attr("height", height)
//   .attr("class", "vertical")
//   .attr("mask", "url('#circle-mask-2')");

//Grouping elements approach
svg
  .append("g")
  .selectAll("rect")
  .data(d3.range(100))
  .enter()
  .append("rect")
  .attr("y", (d) => d * 20)
  .attr("width", width)
  .attr("height", 10)
  .attr("mask", "url(#circle-mask)");

svg
  .append("g")
  .selectAll("rect")
  .data(d3.range(100))
  .enter()
  .append("rect")
  .attr("x", (d) => d * 20)
  .attr("width", 10)
  .attr("height", height)
  .attr("mask", "url('#circle-mask-2')");
