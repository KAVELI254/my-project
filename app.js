// server/server.js
const express = require('express');
const app = express();
const port = 3000;

// In-memory store for feedback and resources
let feedbacks = [];
let resources = [
  { id: 1, title: "AI Tutoring", description: "AI-powered tutors to help with personalized learning.", videoUrl: "https://www.example.com/ai-tutoring-video" },
  { id: 2, title: "Online Courses", description: "Wide range of online courses on various topics.", videoUrl: "https://www.example.com/online-courses-video" },
  { id: 3, title: "Virtual Classrooms", description: "Experience live classes with students and teachers from around the world.", videoUrl: "https://www.example.com/virtual-classrooms-video" },
];

app.use(express.static('public'));
app.use(express.json());  // To parse JSON bodies

// Get list of resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// Post feedback for a technology
app.post('/feedback', (req, res) => {
  const { name, feedback } = req.body;
  if (name && feedback) {
    feedbacks.push({ name, feedback, date: new Date() });
    res.status(201).json({ message: 'Feedback submitted!' });
  } else {
    res.status(400).json({ message: 'Name and feedback are required.' });
  }
});

// Get all feedback
app.get('/feedback', (req, res) => {
  res.json(feedbacks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
