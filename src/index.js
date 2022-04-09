const numbers = [1, 2, 3];

// mutating an array in an immutable way
// Adding
const addNewNum = [4, ...numbers];
// insert an item to a particular index in an array (e.g insert at index 2)
const insertNum = [...numbers.slice(0, 2), 5, ...numbers.slice(2)];
// removing an item (say 3)
const removeNum = numbers.filter((n) => n !== 3);
// updating an item (if we are dealing with an array of objects, spread the object element i.e instead of 20, we do {...} )
const updateNum = numbers.map((num) => (num === 2 ? 20 : num));

console.log({
  numbers,
  addNewNum,
  insertNum,
  removeNum,
  updateNum,
});
