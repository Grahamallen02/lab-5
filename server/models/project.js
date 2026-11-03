const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
  teamMember: { type: String, required: true },
  progressNote: { type: String, default: '' }
});

module.exports = mongoose.model('Project', projectSchema, 'Projects');
