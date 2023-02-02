import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <button>Calculate delivery price</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
