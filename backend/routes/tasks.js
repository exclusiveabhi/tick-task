const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, deadline, priority, notificationType, notificationEmail, notificationWhatsApp, notificationTime } = req.body;
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      deadline,
      priority,
      notificationType,
      notificationEmail,
      notificationWhatsApp,
      notificationTime,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;