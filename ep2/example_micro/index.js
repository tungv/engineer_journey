const { send, json } = require("micro");
const { router, get, put } = require("microrouter");

function withAuthentication(handler) {
  return async function(req, res) {
    if (req.headers.authentication === "Basic: 123") {
      return handler(req, res);
    }

    send(res, 401, {
      msg: "Please login",
    });
  };
}

function withBody(handler) {
  return async function(req, res) {
    const body = await json(req);
    return handler(body, req, res);
  };
}

async function api_1(body, req, res) {
  send(res, 202, {
    method: req.method,
    body,
  });
}

async function hello() {
  return "hello";
}

module.exports = router(
  get("/hello/*", router(...)),
  put("/api_1", withBody(api_1)),
);
