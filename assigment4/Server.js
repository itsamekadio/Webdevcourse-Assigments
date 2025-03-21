//sorry ana 3mlto f file wa7d el w2t 2osayar
require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
});

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll({ include: Task });
  res.json(users);
});

app.post("/users/:userId/tasks", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const task = await Task.create({ ...req.body, userId: user.id });
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({ include: User });
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  await task.update(req.body);
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  await task.destroy();
  res.json({ message: "Deleted" });
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Database ready!");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
