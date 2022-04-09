// a higher-order fn that receives a fxn as an argument
function greet(fn) {
  console.log(fn());
}

// another higher-order fxn that returns a fxn - actually a HOF can do both (i.e take a fxn as an arg and also return a fxn)
function sayHello() {
  return function () {
    return "Hello World";
  };
}

let numbers = [1, 2, 3, 4];
// map is an e.g of an HoF
numbers.map((n) => n * 2);
// another e.g is the setimeout
setTimeout(() => {
  console.log("Call me Mr Student");
}, 2000);
