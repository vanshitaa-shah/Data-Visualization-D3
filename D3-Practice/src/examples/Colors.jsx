import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const colors = ({ data }) => {
  useEffect(() => {
    d3.select("#color-items")
      .selectAll("p")
      .data(data)
      .join("p") //combination of enter update(merge) and exit
      .text((d) => "This is " + d + " paragraph")
      .style("color", (d) => d);

    setTimeout(() => {
      data = data.slice(0, 2);
      d3.select("#color-items").selectAll("p").data(data).exit().remove();
      // d3.select("#items").selectAll("p").data(data).join("p");
    }, 2000);
  }, []);

  return <div id="color-items"></div>;
};

export default colors;

// const colors = ({ data }) => {
//   useEffect(() => {
//     d3.select("#items")
//       .selectAll("p")
//       .data(data)
//       // .join("p")
//       //creates all missing paragraphs
//       .enter()
//       .append("p")
//       //won't update existing p, skip that data item
//       .text((d) => "This is " + d + " paragraph");
//   }, []);

//   return (
//     <div id="items">
//       <p id="a">a</p>
//     </div>
//   );
// };

// export default colors;
