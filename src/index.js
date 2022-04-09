// a function is pure if when we pass in same argument, it returns same result, no matter the number of times it is called
function addBy2(n) {
  return n + 2;
}

const r1 = addBy2(4); // 6
const r2 = addBy2(4); // 6

// pure functions cant have random values, current date/time, no global state (like DOM, files, db etc), no mutation of parameters
