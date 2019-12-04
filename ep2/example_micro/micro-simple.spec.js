const service = require("./micro-simple");
const micro = require("micro");
const got = require("got");

test("it should return JSON object with `body` prop", () => {
  return useService(service, async url => {
    const { body } = await got.put(url, {
      json: true,
      body: { key: "value" },
    });

    expect(body).toEqual({ body: { key: "value" }, method: "PUT" });
  });
});

async function useService(service, computation) {
  const server = micro(service);
  return new Promise((resolve, reject) => {
    server.listen(err => {
      if (err) {
        reject(err);
      } else {
        const { port } = server.address();
        const url = `http://localhost:${port}`;

        return computation(url).finally(() => {
          server.close();
          resolve();
        });
      }
    });
  });
}
