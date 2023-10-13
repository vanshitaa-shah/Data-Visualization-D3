import React from "react";
import ListItems from "./examples/ListItems";
import ParagraphSelection from "./examples/ParagraphSelection";
import Colors from "./examples/Colors";
import Selections from "./examples/Selections";

const App = () => {
  return (
    <>
      <ParagraphSelection />
      <ListItems />
      <Colors data={["red", "green", "blue", "yellow"]} />
      <Selections />
    </>
  );
};

export default App;
