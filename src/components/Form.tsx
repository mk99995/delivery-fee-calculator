import { useEffect } from "react";

const Form = ({
  setCartValue,
  setDistance,
  setItemsAmount,
  setDateTime,
  setAnimationTimeout,
}: {
  setCartValue: (value: number | "") => void;
  setDistance: (distance: number | "") => void;
  setItemsAmount: (items: number | "") => void;
  setDateTime: (time: Date | "") => void;
  setAnimationTimeout: (animationTimeout: any) => void;
}) => {
  const showAnimation = () => {
    setAnimationTimeout((current: number) => current + 1);
    setTimeout(function () {
      setAnimationTimeout((current: number) => current - 1);
    }, 300);
  };

  const resetInputs = (e: any) => {
    e.preventDefault();
    e.target.cartValue.value = "";
    e.target.distance.value = "";
    e.target.items.value = "";
    e.target.date.value = "";
    setDistance("");
    setItemsAmount("");
    setDateTime("");
    showAnimation();
  };

  return (
    <form onReset={resetInputs} onSubmit={() => console.log("asd")}>
      <input
        name="cartValue"
        placeholder="Cart value"
        type="number"
        min="0"
        step="0.01"
        onChange={(e) => {
          setCartValue(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />
      <h3>€</h3>
      <input
        name="distance"
        placeholder="Distance"
        type="number"
        min="0"
        step="1"
        onChange={(e) => {
          setDistance(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />
      <h3>m</h3>

      <input
        name="items"
        placeholder="Number of items"
        type="number"
        min="1"
        step="1"
        onChange={(e) => {
          setItemsAmount(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />

      <input
        id="date"
        name="date"
        type="datetime-local"
        onChange={(e) => {
          setDateTime(new Date(e.target.value));
          showAnimation();
        }}
      />
      <input id="reset-button" type="reset" />
    </form>
  );
};

export default Form;
