const Form = ({
  setCartValue,
  setDistance,
  setItemsAmount,
  setDateTime,
  dateTime,
  cartValue,
  setAnimationTimeout,
}: {
  setCartValue: (value: number | "") => void;
  setDistance: (distance: number | "") => void;
  setItemsAmount: (items: number | "") => void;
  setDateTime: (time: Date) => void;
  dateTime: Date;
  cartValue: number | "";
  animationTimeout: number;
  setAnimationTimeout: (animationTimeout: any) => void;
}) => {
  const formatDate = () => {
    const offset = dateTime.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

  const showAnimation = () => {
    setAnimationTimeout((animationTimeout: number) => animationTimeout + 1);
    setTimeout(function () {
      setAnimationTimeout((animationTimeout: number) => animationTimeout - 1);
    }, 300);
  };

  const resetInputs = (e: any) => {
    e.preventDefault();
    e.target.cartValue.value = "";
    e.target.distance.value = "";
    e.target.items.value = "";
    setCartValue("");
    setDistance("");
    setItemsAmount("");
    setDateTime(new Date());
    showAnimation();
  };

  return (
    <form onReset={resetInputs}>
      <input
        name="cartValue"
        type="number"
        min="0"
        step="0.01"
        value={cartValue}
        onChange={(e) => {
          setCartValue(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />
      <input
        name="distance"
        type="number"
        min="0"
        step="1"
        onChange={(e) => {
          setDistance(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />
      <input
        name="items"
        type="number"
        min="1"
        step="1"
        onChange={(e) => {
          setItemsAmount(e.target.value === "" ? "" : Number(e.target.value));
          showAnimation();
        }}
      />
      <input
        type="datetime-local"
        value={formatDate()}
        onChange={(e) => {
          setDateTime(new Date(e.target.value));
          showAnimation();
        }}
      />
      <input type="reset" />
    </form>
  );
};

export default Form;
