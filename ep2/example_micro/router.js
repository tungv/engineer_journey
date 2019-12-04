const { send, json } = require("micro");
const { router, get, put } = require("microrouter");

async function api_1(req, res) {
  const body = await json(req);

  send(res, 202, {
    method: req.method,
    body,
  });
}

async function hello() {
  return "hello";
}

module.exports = router(get("/hello", hello), put("/api_1", api_1));
