const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const cron = require('node-cron');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('AI Study Planner API is running');
});

// Basic Cron Job to simulate reminders (Runs every day at 8 AM)
cron.schedule('0 8 * * *', () => {
    console.log('Running daily reminder check...');
    // Logic goes here (e.g. Email users about pending tasks using nodemailer)
    console.log('Reminders sent!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
