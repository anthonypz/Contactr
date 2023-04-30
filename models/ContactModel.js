const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    jobIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing',
    }],
    contactName: {
        type: String,
        required: true,
    },
    company: String,
    position: String,
    social_url: String,
    email: String,
    phone: String,
    comments: String,
})

module.exports = mongoose.model('Contact', ContactSchema)
