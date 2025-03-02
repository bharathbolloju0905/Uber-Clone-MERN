const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const connect = require("./DB/Connect");



server.listen(PORT, () => {
    connect();
  console.log(`Server running on port ${PORT}`);
});