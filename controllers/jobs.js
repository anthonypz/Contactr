const Company = require('../models/Company')
const Job = require('../models/Job')
const Contact = require('../models/Contact')
const Task = require('../models/Task')

// @desc    Show add page
// @route   GET /jobs/add
exports.showJobs = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.id }).lean()
        const companies = await Company.find({ userId: req.user.id }).lean()
        res.render("addJob.ejs", {
            contacts,
            companies
        })
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }
}
