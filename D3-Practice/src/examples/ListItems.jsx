import React from "react";

import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";

const ListItems = () => {
  const [styledItems, setstyledItems] = useState("odd");
  const remainingItems = styledItems === "odd" ? "even" : "odd";

  useEffect(() => {
    d3.select("#items")
      .selectAll(`li:nth-child(${styledItems})`)
      .style("color", "red");

    d3.selectAll(`li:nth-child(${remainingItems})`).style("color", "black");
  }, [styledItems]);

  return (
    <>
      <ul id="items">
        <li>item-1</li>
        <li>item-2</li>
        <li>item-3</li>
        <li>item-4</li>
        <li>item-5</li>
        <li>item-6</li>
        <li>item-7</li>
        <li>item-8</li>
        <li>item-9</li>
        <li>item-10</li>
      </ul>

      <button onClick={() => setstyledItems(remainingItems)}>
        {`${remainingItems}-style`}
      </button>
    </>
  );
};

export default ListItems;
