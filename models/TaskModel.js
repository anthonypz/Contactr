const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobListing',
  },
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: String,
  dueDate: Date,
  completed: Boolean,
  comments: String,

})

module.exports = mongoose.model('Task', TaskSchema)
