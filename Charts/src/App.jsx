import "./App.css";
import Chart1 from "./examples/Chart1";
import Chart2 from "./examples/Chart2";
import InteractiveChart from "./examples/InteractiveChart";
import LineChart from "./examples/LineChart";
import PieChart from "./examples/PieChart";
import Scatterplot from "./examples/Scatterplot";
import Transition from "./examples/Transition";
import TransitionScatterplot from "./examples/TransitionScatterplot";
import AnimatedScatterPlot from "./examples/AnimatedScatterPlot";

function App() {
  return (
    <>
      <h2>Bar Chart</h2>
      <InteractiveChart />
      <hr />
      <h2>Scatterplot for iris dataset</h2>
      <AnimatedScatterPlot />
      <hr />
      <h2>Pie chart : with animation and events</h2>
      <PieChart />
      {/* <Transition />
      <Scatterplot />
      <TransitionScatterplot />
      <Chart1 />
      <Chart2 />
      <LineChart /> */}
    </>
  );
}

export default App;
