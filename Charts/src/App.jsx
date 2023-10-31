import "./App.css";
import Chart1 from "./examples/Chart1";
import Chart2 from "./examples/Chart2";
import InteractiveChart from "./examples/InteractiveChart";
import LineChart from "./examples/LineChart";
import PieChart from "./examples/PieChart";
import Scatterplot from "./examples/Scatterplot";
import A from "./examples/Temp";
import PieChart2 from "./examples/Temp2";
import DynamicscatterPlot from "./examples/DynamicscatterPlot";
import AnimatedScatterPlot from "./examples/AnimatedScatterPlot";

function App() {
  return (
    <>
      {/* <A /> */}
      <Chart1 />
      <Chart2 />
      <Scatterplot />
      <InteractiveChart />
      <LineChart />
      <PieChart />
      <PieChart2 />
      {/* <DynamicscatterPlot /> */}
      {/* <AnimatedScatterPlot /> */}
    </>
  );
}

export default App;
