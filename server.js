const express = require("express");
const cors = require("cors");

const server = express();

// Routes
const projectRoutes = require("./projects/project-routes.js");
const actionsRoutes = require("./actions/action-routes.js");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionsRoutes);

module.exports = server;
