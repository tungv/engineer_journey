const _ = require("lodash");

const integers = [10, -1, 5, 3, 2, 6, 3, 9, 101];

// using filter
const oddWithFilter = _.filter(integers, num => num % 2 !== 0);
const evenWithFilter = _.filter(integers, num => num % 2 === 0);

// using partition
const [odd, even] = _.partition(integers, num => num % 2 !== 0);

console.log({ odd, even });
