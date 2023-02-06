import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import BeatLoader from "react-spinners/BeatLoader";

function App(this: any): JSX.Element {
  //useStates have union with "" to handle empty input fields
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
      return "More information needed";
    }
    let fee: number =
      //surchange when cart value is under 10
      (cartValue < 10 ? 10 - cartValue : 0) +
      //fee from distance
      (distance <= 1000 ? 2 : Math.ceil(distance / 500)) +
      //surchange from amount of items
      (itemsAmount < 5 ? 0 : (itemsAmount - 4) * 0.5) +
      //1.2€ bulk fee
      (itemsAmount > 12 ? 1.2 : 0);
    //checkin if it is friday rush time
    if (dateTime.getUTCDay() === 5) {
      let timeInThousands: number =
        dateTime.getUTCHours() * 100 + dateTime.getUTCMinutes();
      if (timeInThousands >= 1500 && timeInThousands <= 1900) {
        fee = fee * 1.2;
      }
    } //getDay, getHours and getMinutes can be used instead of UTC for other timezones

    return `Delivery price: ${
      fee > 15 ? 15 : fee % 1 === 0 ? fee : fee.toFixed(2)
    }€`; //fee cannot be more than 15€
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
      <footer />
    </div>
  );
}

export default App;
