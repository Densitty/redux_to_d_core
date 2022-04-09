import { compose, pipe } from "lodash/fp";

let input = "  I love writing JS   ";

// output can be achieved in a functional programming way
// first trim
const trimStr = (str) => str.trim();
// we can convert the str in input to lowercases
const convertToLower = (str) => str.toLowerCase();
// wrap a string in div - which does not know whether str is trimmed or not
const wrapInDiv = (str) => `<div>${str}</div>`;

// to create a divElement that wraps a trimmed string, we can compose the 2 fxns
const res = wrapInDiv(convertToLower(trimStr(input)));

// res has 2 problems; we have to read the expression 4rm right to left to understand what is going to be returned and then also many parentheses; imagine having many functions

// we can solve the above problem using lodash and the utility functions inside it
const transform = compose(wrapInDiv, convertToLower, trimStr);
const res2 = transform(input);

// we can use the pipe function to further simplify things by writing the functions in the order we want to apply it instead of doing it from right to left as we have in transform
const transform2 = pipe(trimStr, convertToLower, wrapInDiv);
const res3 = transform2(input);

console.log({
  res,
  res2,
  res3,
});
