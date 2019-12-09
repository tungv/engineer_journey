const micro = require("micro");
const { router, get, post } = require("microrouter");

async function createUser(req, res) {
  const data = await micro.json(req);
  res.statusCode = 200;
  return {
    from: "micro-dev",
    msg: "Hello " + data.name,
  };
}

async function getAllUsers() {
  return [{ name: "Tung" }, { name: "Ben" }];
}

module.exports = router(
  get("/api/users", getAllUsers),
  post("/api/users", createUser),
);
