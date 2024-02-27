// Gets the current date and returns it in a format that can be used to default a datepicker to the current date

export const getCurrentDate = () => {
  const date = new Date();
  const padNumber = (num: number) => num.toString().padStart(2, '0');
  const day = padNumber(date.getDate());
  const month = padNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
