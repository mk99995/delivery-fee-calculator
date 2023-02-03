import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <form className="App">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="date" />
      <input type="submit" value="Calculate delivery price" />
      <p>{count}</p>
    </form>
  );
}

export default App;
