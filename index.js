const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(4000, () => console.log(`Server listening on port 4000`));
