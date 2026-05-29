const Subject = require('../models/Subject');
const Task = require('../models/Task');

// Helper to determine hours per day based on difficulty weight
const getWeight = (difficulty) => {
  switch (difficulty) {
    case 'Hard':
      return 1.5;
    case 'Medium':
      return 1.0;
    case 'Easy':
      return 0.5;
    default:
      return 1.0;
  }
};

// @desc    Generate a schedule for the user based on active subjects
// @route   POST /api/schedule/generate
// @access  Private
const generateSchedule = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all active subjects
    const subjects = await Subject.find({ user: userId });

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({ message: 'No subjects found to schedule' });
    }

    // Clear existing incomplete tasks to regenerate
    await Task.deleteMany({ user: userId, isCompleted: false });

    // Current Date (Midnight to align mathematically)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const generatedTasks = [];

    // Simple Algorithm: Distribute remaining hours randomly or evenly across days till deadline
    for (const subject of subjects) {
      const remainingHours = subject.estimatedHours - subject.completedHours;

      if (remainingHours <= 0) continue;

      const deadlineDate = new Date(subject.deadline);
      deadlineDate.setHours(0, 0, 0, 0);

      const daysRemaining = Math.max(
        1,
        Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24))
      );
      
      const hoursPerDay = remainingHours / daysRemaining;

      for (let i = 0; i < daysRemaining; i++) {
        const taskDate = new Date(today);
        taskDate.setDate(today.getDate() + i);

        generatedTasks.push({
          user: userId,
          subject: subject._id,
          date: taskDate,
          durationHours: Number((hoursPerDay).toFixed(2)),
          isCompleted: false,
        });
      }
    }

    if (generatedTasks.length > 0) {
      await Task.insertMany(generatedTasks);
    }

    res.json({ message: 'Schedule generated successfully', count: generatedTasks.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get schedule tasks for a specific date range or all
// @route   GET /api/schedule
// @access  Private
const getSchedule = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId })
      .populate('subject', 'name difficulty')
      .sort({ date: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark a task as complete
// @route   PUT /api/schedule/:taskId/complete
// @access  Private
const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : true;
    const updatedTask = await task.save();

    // Update subject completed hours
    if (task.isCompleted) {
        const subject = await Subject.findById(task.subject);
        subject.completedHours += task.durationHours;
        await subject.save();
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSchedule, getSchedule, completeTask };
