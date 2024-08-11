function printThreeAndFive() {
  for (let i = 0; i < 1001; i++) {
    let sumNumers = i
      .toString()
      .split("")
      .reduce((total, item) => {
        return +total + +item;
      }, 0);
    if (i % 3 === 0 && i % 5 !== 0 && sumNumers < 10) {
      console.log(i);
    }
  }
}
printThreeAndFive();

class Increment {
  constructor() {
    this.currentValue = 0;
  }

  get value() {
    return ++this.currentValue;
  }
}
let increment = new Increment();
console.log(increment.value);
console.log(increment.value);
console.log(increment.value + increment.value);
