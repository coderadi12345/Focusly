const mongoose = require('mongoose');
const Subject = require('./models/Subject');
const Task = require('./models/Task');
const User = require('./models/User');
require('dotenv').config({ path: './.env' });

async function checkData() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const users = await User.find({});
  if (users.length === 0) {
    console.log("No users found");
    process.exit(0);
  }
  const user = users[0];
  console.log("User:", user.username);

  const subjects = await Subject.find({ user: user._id });
  console.log("Subjects:", subjects.length);
  
  const tasks = await Task.find({ user: user._id });
  console.log("Tasks:", tasks.length);

  try {
    let totalEstimatedHours = 0;
    let totalCompletedHours = 0;

    subjects.forEach((subject) => {
      totalEstimatedHours += subject.estimatedHours;
      totalCompletedHours += subject.completedHours;
    });

    console.log({ totalEstimatedHours, totalCompletedHours });

    const completionRate = totalEstimatedHours === 0 
        ? 0 
        : ((totalCompletedHours / totalEstimatedHours) * 100).toFixed(2);
    
    console.log({ completionRate });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const recentCompletedTasks = tasks.filter(
        t => t.isCompleted && new Date(t.updatedAt) >= last7Days
    );

    const studyHoursPerDay = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
    };

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    recentCompletedTasks.forEach(task => {
        const dayName = days[new Date(task.updatedAt).getDay()];
        studyHoursPerDay[dayName] += task.durationHours;
    });

    console.log(studyHoursPerDay);

  } catch (err) {
    console.error("ERROR:", err);
  }

  process.exit(0);
}

checkData();
