let counter = 1;

const incrementCounterAndPrint = () => console.log(counter);

setInterval(() => {
  incrementCounterAndPrint(counter);
  counter++;
}, 1000);
