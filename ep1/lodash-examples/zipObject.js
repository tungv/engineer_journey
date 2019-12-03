const _ = require("lodash");

// zipObject
const headers = ["id", "name", "age"];

const rows = [
  ["1", "Tung", 30],
  ["2", "Albert", 40],
  ["3", "Bennett", 60],
];

const users = rows.map(row => _.zipObject(headers, row));
console.log(users);
