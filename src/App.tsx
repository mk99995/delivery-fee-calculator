import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import BeatLoader from "react-spinners/BeatLoader";

function App(this: any) {
  const [cartValue, setCartValue] = useState<number | "">("");
  const [distance, setDistance] = useState<number | "">("");
  const [itemsAmount, setItemsAmount] = useState<number | "">("");
  const [dateTime, setDateTime] = useState<Date>(new Date());

  const [animationTimeout, setAnimationTimeout] = useState<number>(0);

  const calculateFee = (): number | string => {
    if (cartValue >= 100) {
      return "0 The delivery is free on large purchages";
    }
    if (cartValue === "" || distance === "" || itemsAmount === "") {
      return "asd";
    }
    let fee: number =
      (cartValue < 10 ? 10 - Number(cartValue) : 0) +
      (distance <= 1000 ? 2 : Math.ceil(distance / 500)) +
      (itemsAmount < 5 ? 0 : (itemsAmount - 4) * 0.5) +
      (itemsAmount > 12 ? 1.2 : 0);

    if (dateTime?.getDay() === 5) {
      let timeInThousands = dateTime.getHours() * 100 + dateTime.getMinutes();
      if (timeInThousands >= 1500 && timeInThousands <= 1900) {
        fee = fee * 1.2;
      }
    }
    return fee < 15 ? fee : 15;
  };

  return (
    <div className="app">
      <p>{dateTime.toISOString().slice(0, 16)}</p>
      <Form
        setCartValue={setCartValue}
        setDistance={setDistance}
        setItemsAmount={setItemsAmount}
        setDateTime={setDateTime}
        dateTime={dateTime}
        cartValue={cartValue}
        setAnimationTimeout={setAnimationTimeout}
        animationTimeout={animationTimeout}
      />
      <>{animationTimeout > 0 ? <BeatLoader /> : calculateFee()}</>
      <p>{animationTimeout}</p>
    </div>
  );
}

export default App;
