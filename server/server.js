const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/project');

const app = express();
const PORT = 8001;

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/IT6203')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error getting projects' });
  }
});

app.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error saving project', error: err.message });
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: 'Invalid project ID' });
  }
});

app.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting project' });
  }
});

app.listen(PORT, () => {
  console.log('MongoDB server running on port ' + PORT);
});
