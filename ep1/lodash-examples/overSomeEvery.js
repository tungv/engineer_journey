const _ = require("lodash");

// overSome | overEvery
const users = [
  { id: "1", name: "Tung", twitter: "tung__vu" },
  { id: "2", name: "Daniel", twitter: "dan_abramov" },
  { id: "3", name: "Andrew Clark", twitter: "acdlite" },
  { id: "4", name: "Elon", twitter: "elonmusk" },
];

const hasShortName = user => user.name.length <= 4;
const hasLodashInHandle = user => /_/.test(user.twitter);

const AND = _.overEvery([hasShortName, hasLodashInHandle]);
const OR = _.overSome([hasShortName, hasLodashInHandle]);

console.log(users.filter(AND));
