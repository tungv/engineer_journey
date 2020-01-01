const service = require("..");
const micro = require("micro");
const listen = require("test-listen");
const fetch = require("isomorphic-fetch");

module.exports = async function withExecute(handler) {
  const server = micro(service);
  const url = await listen(server);

  async function execute(query, variables) {
    const resp = await fetch(`${url}/graphql`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await resp.json();
    return json;
  }

  try {
    return await handler(execute);
  } finally {
    server.close();
  }
};
