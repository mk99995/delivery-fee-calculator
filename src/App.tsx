import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  let calculateFee = (e: any) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <form className="App" onSubmit={calculateFee}>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="datetime-local" />
      <input type="submit" value="Calculate delivery price" />
      <p>{count}</p>
    </form>
  );
}

export default App;
