const http = require("http");

const server = http.createServer(function(req, res) {
  console.log(">> %s %s", req.method, req.url);

  let content = "";
  req.on("data", function(chunk) {
    content += String(chunk);
  });

  req.on("end", function() {
    const data = JSON.parse(content);
    res.statusCode = 201;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        from: "nodejs server",
        msg: "Hello " + data.name,
      }),
    );
  });
});

server.listen(3000, function(err) {
  if (err) {
    // EACCES: access denied
    // EADDRINUSE: address in use
    console.error("Cannot open port 3000", error.name);
    process.exit(1);
  }

  console.log("Server is listening on port 3000…");
});
