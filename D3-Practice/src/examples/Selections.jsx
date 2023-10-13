import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const Selections = () => {
  useEffect(() => {
    /*

      //enter-selection : if P already exists, skips that data item

        d3.select(".enter-selection")
          .selectAll("p")
          .data([1, 2])
          .enter()
          .append("p")
          .text((d) => d);

      //Add this , works like update selection

        // d3.select(".enter-selection")
        //   .selectAll("p")
        //   .text((d) => d);

    */
    /*

      //update-selection : works fine when sufficient p exists doesn't add needed, doesn't remove unwanted P

        d3.select(".update-selection")
          .selectAll("p")
          .data([1, 2])
          .text((d) => d);

      //modify like this, works as exit selection, removes unwanted nodes

        // d3.select(".update-selection")
        //   .selectAll("p")
        //   .data([1, 2])
        //   .text((d) => d)
        //   .exit()
        //   .remove();

    */

    //Best way, shorthand of all the selections
    d3.select(".join")
      .selectAll("p")
      .data([1, 2])
      .join("p")
      .text((d) => d);
  }, []);
  return (
    <>
      <div className="enter-selection">
        <p></p>
      </div>
      <div className="update-selection">
        <p id="a"></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="exit-selection">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="join">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </>
  );
};

export default Selections;
