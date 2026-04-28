const { Task } = require("../models");

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({
    where: { UserId: req.user.id },
  });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    UserId: req.user.id,
  });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  await Task.update(
    { status: req.body.status },
    { where: { id: req.params.id, UserId: req.user.id } }
  );
  res.json({ message: "Updated" });
};

exports.deleteTask = async (req, res) => {
  await Task.destroy({
    where: { id: req.params.id, UserId: req.user.id },
  });
  res.json({ message: "Deleted" });
};