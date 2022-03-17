export const Views = ({ quantity, className }) => {
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <p className={className}>IC {numberWithCommas(quantity)} Today</p>
  );
};
