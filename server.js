const http = require("http");
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
