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
    listingURL: String,
    jobDescription: String,
    source: String,
    application: {
        applied: Boolean,
        applyDate: Date,
        coffeeChat: Boolean,
        coffeeChatDate: Date,
        saidThanks: Boolean,
        interviewDate: Date,
        followUpDate: Date,
    },
    comments: String,
})

module.exports = mongoose.model('Job', JobSchema)
