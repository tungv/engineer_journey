const { createServer } = require("http");

const server = createServer((req, res) => {
  console.log(req.method);
  const buffer = [];
  req.on("data", data => {
    // data is a Buffer
    buffer.push(String(data));
  });

  req.on("end", () => {
    const data = buffer.join("");

    res.end(JSON.stringify({ data: JSON.parse(data) }));
  });
});

server.listen(3000, err => {
  if (err) {
    // err.name
    // 1. EACCES - cannot open because of user permission
    // 2. EADDRINUSE - address in use
    console.error(err);
    return;
  }

  console.log("listening on port 3000");
});
