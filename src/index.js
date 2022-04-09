import { compose, pipe } from "lodash/fp";

let input = "  I love writing JS   ";

const trimStr = (str) => str.trim();
const convertToLower = (str) => str.toLowerCase();
// const wrapInSpan = (str) => `<span>${str}</span>`;
// const wrapInDiv = (str) => `<div>${str}</div>`;

// fxns wrapInSpan & wrapInDiv are similar, hence we can write
const wrapInElement = (elem, str) => `<${elem}>${str}</${elem}>`;
const wrapInElement2 = (elem) => (str) => `<${elem}>${str}</${elem}>`;

// we can use the pipe function to further simplify things by writing the functions in the order we want to apply it instead of doing it from right to left as we have in transform
const transform = pipe(trimStr, convertToLower, wrapInElement);
const res = transform(input);
// which will give the meaningless result below
// <i love writing js>undefined</i love writing js>
// because we have introduced 2 args instead of one and pipe reads the fxn from left to right, passing only 1 arg to wrapInElement instead of 2 expected.
// To solve this problem, we use currying

const transform2 = pipe(trimStr, convertToLower, wrapInElement2("div"));
const res2 = transform2(input);

const transform3 = pipe(trimStr, convertToLower, wrapInElement2("p"));
const res3 = transform3(input);

console.log({ res, res2, res3 });
