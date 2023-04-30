const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    jobTitle: {
        type: String,
        required: true,
    },
    jobURL: String,
    jobDescription: String,
    jobLocation: String,
    jobStatus: {
        type: String,
        enum: ("Open", "Closed", "Cancelled"),
        default: "Open",
    },
    jobNotes: {
        type: [String],
        default: undefined,
    },
    
})

module.exports = mongoose.model('Job', JobSchema)
