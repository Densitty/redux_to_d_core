import { Map } from "immutable";
// JS is not a pure functional program but we can use libraries that can help enforce immutability in the language using libraries like Immutable, Immer or Mori

const book1 = { title: "The Boy with the Longest Name" };

// the fxn publishBook is mutating object directly; violation of functional programming
function publishBook(book) {
  book.isPublished = true;
}

publishBook(book1);

// using Immutable.js
const book2 = Map({ title: "Alice in Wonderland" });
// console.log(book2); // a different DS from what we expect {title: "..."}
// using Immutable.js, we cant access properties directly like
// console.log(book2.title); // undefined
// to access ppties
console.log(book2.get("title"));
// to get the object we are expecting
console.log(book2.toJS());
// to mutate book2 in an immutable way using Immutable.js
function publishStatus(book) {
  return book.set("isPublished", true);
}

const book2Mutated = publishStatus(book2);
console.log(book2Mutated.toJS());
