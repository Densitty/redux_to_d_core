// pure functions cant change or mutate args; hence we have a concept called immutability (i.e once an object is created, it cannot be changed but if we want to change it, we have to create a copy of it and then change that copy)

let myName = "john";
let nameUpper = myName.toUpperCase(); // myName is unaffected

// in JS, objects and arrays are not immutable unlike string;
const person = { name: "John" };
person.name = "Tim"; // which is against rules of functional programming

// to mutate an object in FP, we first copy the object
const girl = { name: "Alice" };

// we create a copy using either of the b=methods below
const girlMutateUsingObjectAssign = Object.assign({}, girl, {
  name: "Alice Wang",
  married: false,
});

const girlMutateUsingSpread = {
  ...girl,
  name: "Alice C. Wang",
  age: 21,
  married: false,
};

console.log({ girl, girlMutateUsingObjectAssign, girlMutateUsingSpread });

// however both Object.Assign & {...spread} shallow copies
const friend = {
  name: "Andy",
  age: 22,
  location: { city: "Prague", country: "Czech Republic" },
};

const friendUpdate = { ...friend };
friendUpdate.name = "Andy Wong";
// because of shallow copy, friend.location.city too will be updated/mutated (violation of FP)
friendUpdate.location.city = "Brno";

// console.log(friend.location.city); // Brno
// console.log(friendUpdate.location.city); // Brno
console.log({ friend, friendUpdate });

// to deeply copy an object
const girlFriend = {
  name: "Loveth",
  location: { city: "Lagos", country: "Nigeria" },
};

const girlFriendMutated = {
  ...girlFriend,
  location: {
    ...girlFriend.location,
  },
};

girlFriendMutated.location.city = "Abuja";

console.log({
  girlFriend,
  girlFriendMutated,
});

// deep copying object refers to objects that have nested objects like we have in friend and girlFriend objects
// deep copying objects is very verbose (imagine having more nested objects) but we can use a library to help out of verbosity
