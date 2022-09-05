const mongoose = require("mongoose");

const DemoSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  url: String,
  role: String,
  roleURL: String,
  position: String,
  source: String,
  pointOfContact: {
    name: String,
    position: String,
    email: String,
  },
  application: {
    applied: Boolean,
    date: Date,
    coffeeChat: Boolean,
    coffeeChatDate: Date,
    saidThanks: Boolean,
    interviewDate: Date,
    followUp: Date,
  },
  comments: String,
});

module.exports = mongoose.model("Demo", DemoSchema);
