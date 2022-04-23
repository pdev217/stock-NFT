export const fakeChartData = new Array(20).fill({}, 0).map((elem, i) => {
    const newDate = new Date();
    const chartDate = `${newDate.getMonth() + 1}/${newDate.getDate()}`;
  
    return { name: "Page A", price: Math.random() * 10 + i/2, date: chartDate };
  });