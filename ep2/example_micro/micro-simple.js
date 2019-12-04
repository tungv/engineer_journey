const { json } = require("micro");

module.exports = async function(req) {
  const body = await json(req);
  return {
    method: req.method,
    body,
  };
};
