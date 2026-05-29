const Subject = require('../models/Subject');
const Task = require('../models/Task');

// @desc    Get user study analytics (hours studied, completion rate)
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const subjects = await Subject.find({ user: userId });
    const tasks = await Task.find({ user: userId });

    let totalEstimatedHours = 0;
    let totalCompletedHours = 0;

    subjects.forEach((subject) => {
      totalEstimatedHours += subject.estimatedHours;
      totalCompletedHours += subject.completedHours;
    });

    const completionRate = totalEstimatedHours === 0 
        ? 0 
        : ((totalCompletedHours / totalEstimatedHours) * 100).toFixed(2);

    const completedTasksCount = tasks.filter(t => t.isCompleted).length;
    const pendingTasksCount = tasks.length - completedTasksCount;

    // Daily study hours (last 7 days)
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

    res.json({
      totalSubjects: subjects.length,
      totalEstimatedHours,
      totalCompletedHours,
      completionRate,
      completedTasksCount,
      pendingTasksCount,
      studyHoursPerDay
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics };
