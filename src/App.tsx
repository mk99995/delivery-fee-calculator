import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import BeatLoader from "react-spinners/BeatLoader";

function App(this: any) {
  const [cartValue, setCartValue] = useState<number | "">("");
  const [distance, setDistance] = useState<number | "">("");
  const [itemsAmount, setItemsAmount] = useState<number | "">("");
  const [dateTime, setDateTime] = useState<Date | "">("");

  const [animationTimeout, setAnimationTimeout] = useState<number>(0);

  const calculateFee = (): string => {
    if (cartValue >= 100) {
      return "Delivery price: 0€";
    }
    if (
      cartValue === "" ||
      distance === "" ||
      itemsAmount === "" ||
      dateTime === ""
    ) {
      return "Need more info to calculate";
    }
    let fee: number =
      (cartValue < 10 ? 10 - cartValue : 0) +
      (distance <= 1000 ? 2 : Math.ceil(distance / 500)) +
      (itemsAmount < 5 ? 0 : (itemsAmount - 4) * 0.5) +
      (itemsAmount > 12 ? 1.2 : 0);

    if (dateTime.getDay() === 5) {
      let timeInThousands = dateTime.getHours() * 100 + dateTime.getMinutes();
      if (timeInThousands >= 1500 && timeInThousands <= 1900) {
        fee = fee * 1.2;
      }
    }

    return `Delivery price: ${fee < 15 ? fee : 15}€`;
  };

  return (
    <div className="app">
      <div id="content-container">
        <header>
          <h2>Delivery Fee Calculator</h2>
        </header>

        <Form
          setCartValue={setCartValue}
          setDistance={setDistance}
          setItemsAmount={setItemsAmount}
          setDateTime={setDateTime}
          setAnimationTimeout={setAnimationTimeout}
        />
        <div id="delivery-fee">
          {animationTimeout > 0 ? (
            <BeatLoader margin={10} color={"white"} />
          ) : (
            calculateFee()
          )}
        </div>
      </div>
      <footer>
        {dateTime !== ""
          ? dateTime.getDay() +
            dateTime.getHours() * 100 +
            dateTime.getMinutes()
          : null}
      </footer>
    </div>
  );
}

export default App;
