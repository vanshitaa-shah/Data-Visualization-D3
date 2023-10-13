import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const ParagraphSelection = () => {
  //enter selection
  useEffect(() => {
    d3.select("#para-items")
      .selectAll("p")
      .data([1, 11, 111])
      .enter()
      // //binds data with missing paragraphs
      .append("p")
      .text((d) => d);
    //only 11 and 111, already one P exists in div
  }, []);

  /*
  //   shorthand for enter and update selection

  useEffect(() => {
    const node = d3
      .select("div>div") //root div-direct child
      .selectAll("p")
      .data([1, 11, 111])
      .join("p")
      .text((d) => d); //only 111
  }, []);

  */

  return (
    <>
      <div id="para-items">
        <p></p>
      </div>
    </>
  );
};

export default ParagraphSelection;
