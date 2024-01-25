let counter = 1;

const counterIncrementAndPrint = () => {
  console.log(counter);
  counter++;
  setTimeout(counterIncrementAndPrint, 1000);
};

counterIncrementAndPrint();
