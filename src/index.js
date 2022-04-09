// an ideal functional programming is to write some small & reusable fxns and compose them to build more complex fxns for solving real world problems

let input = "  I love writing JS   ";
let output = `<div>${input.trim()}</div>`;
// output creates a div element & hosts our trimmed input in it
console.log(output);

// output can be achieved in a functional programming way
// first trim
const trimStr = (str) => str.trim();
// we can convert the str in input to lowercases
const convertToLower = (str) => str.toLowerCase();
// wrap a string in div - which does not know whether str is trimmed or not
const wrapDiv = (str) => `<div>${str}</div>`;

// to create a divElement that wraps a trimmed string, we can compose the 2 fxns
const res = wrapDiv(convertToLower(trimStr(input)));

// res has 2 problems; we have to read the expression 4rm right to left to understand what is going to be returned and then also many parentheses; imagine having many functions
