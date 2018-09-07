const postRoutes = require("./posts");
const userRoutes = require("./users");
const taskRoutes = require("./tasks");

const constructorMethod = app => {
  app.use("/posts", postRoutes);
  app.use("/users", userRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
