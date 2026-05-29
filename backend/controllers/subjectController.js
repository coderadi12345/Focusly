const Subject = require('../models/Subject');
const Task = require('../models/Task');

// @desc    Get all subjects for a user
// @route   GET /api/subjects
// @access  Private
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user._id });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new subject
// @route   POST /api/subjects
// @access  Private
const addSubject = async (req, res) => {
  try {
    const { name, deadline, difficulty, estimatedHours } = req.body;

    const subject = new Subject({
      user: req.user._id,
      name,
      deadline,
      difficulty,
      estimatedHours,
    });

    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a subject and its tasks
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      if (subject.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await Task.deleteMany({ subject: subject._id });
      await subject.deleteOne();
      res.json({ message: 'Subject removed' });
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSubjects, addSubject, deleteSubject };
