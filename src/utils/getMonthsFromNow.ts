const getMonthsFromNow = (howManyMonths: number): string => {
  const months = new Date();
  months.setMonth(months.getMonth() + howManyMonths);
  const month = months.toLocaleString("en-US", {
    month: "long",
  });
  return month;
};

export default getMonthsFromNow;
