import { produce } from "immer";
// Immer simplifies the data structure better than Immutable does

const book = { title: "The Boy with the Longest Name" };

// Immer makes it easy to work with our object as if we were doing the spread operator or Object.Assign() unlike what we have in Immutable.js
function publishBook(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
  });
}

const mutatedBook = publishBook(book);

console.log({
  book,
  mutatedBook,
});
