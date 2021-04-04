
import './App.css';
import Mainpage from "./component/Mainpage";
import "../src/css/all.css"
import Scoreboard from "./component/Scoreboard";
import Compare from "./component/Compare";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Mainpage/>
        <Scoreboard/>
        <Compare/>
    </div>
  );
}

export default App;
