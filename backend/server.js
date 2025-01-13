const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const notificationRoutes = require('./notifications');
const cron = require('node-cron');
const Task = require('./models/Task');
const { sendNotificationEmail } = require('./emailService');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

// Cron Job for Email Notifications
cron.schedule('* * * * *', async () => {
  const now = new Date(); // Current time

  try {
    // Fetch tasks with email notifications and deadlines in the future
    const tasks = await Task.find({
      notificationType: 'email',
      deadline: { $gt: now }, // Deadlines that are still in the future
    });

    for (const task of tasks) {
      // Calculate the exact notification time
      const notificationTimeInMs = task.notificationTime * 60000; // Convert minutes to milliseconds
      const notificationTime = new Date(task.deadline.getTime() - notificationTimeInMs);

      // Check if the current time matches the notification time
      if (
        now.toISOString().slice(0, 16) === notificationTime.toISOString().slice(0, 16) // Match to the nearest minute
      ) {
        if (task.notificationEmail) {
          // Send the notification email
          await sendNotificationEmail(
            task.notificationEmail,
            `Task Reminder: ${task.title}`,
            `You have a task "${task.title}" due at ${task.deadline.toLocaleString()}.`
          );
          console.log(`Email sent to ${task.notificationEmail} for task "${task.title}"`);
        }
      }
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
