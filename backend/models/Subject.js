const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
      default: 'Medium',
    },
    estimatedHours: {
      type: Number,
      required: true,
      min: 1,
    },
    completedHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
