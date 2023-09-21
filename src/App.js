import "./styles.css";
import { NavLink } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <button type="button">
          <NavLink to="/example?q=test">To the example component</NavLink>
        </button>
      </div>
    </div>
  );
}
