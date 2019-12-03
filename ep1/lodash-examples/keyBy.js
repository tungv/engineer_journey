const _ = require("lodash");

// keyBy
const users = [
  { id: "1", name: "Tung", twitter: "tung__vu" },
  { id: "2", name: "Daniel", twitter: "dan_abramov" },
  { id: "3", name: "Andrew Clark", twitter: "acdlite" },
  { id: "4", name: "Elon", twitter: "elonmusk" },
];

const indexByTwitter = _.keyBy(users, user => user.id);

console.log(indexByTwitter["4"]);
