const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
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
  jobIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobListing',
  }],
  companyName: {
    type: String,
    required: true,
  },
  url: String,
  companyDescription: String,
  comments: String,
})

module.exports = mongoose.model('Company', CompanySchema)
