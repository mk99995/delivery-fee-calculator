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
  setAnimationTimeout: (fx: (current: number) => number) => void;
}): JSX.Element => {
  //function that is run whenever any input field changes
  //animation is played when animationTimeout < 0
  const showAnimation = (): void => {
    setAnimationTimeout((current) => current + 1);
    setTimeout(function (): void {
      setAnimationTimeout((current) => current - 1);
    }, 300);
  };

  const resetInputs = (e: any): void => {
    e.preventDefault();
    e.target.cartValue.value = "";
    e.target.distance.value = "";
    e.target.items.value = "";
    e.target.date.value = "";
    setCartValue("");
    setDistance("");
    setItemsAmount("");
    setDateTime("");
    showAnimation();
  };

  return (
    <form onReset={resetInputs}>
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
      <input id="reset-button" type="reset" value={"Reset"} />
    </form>
  );
};

export default Form;
