const Company = require('../models/CompanyModel')
const Job = require('../models/JobModel')
const Contact = require('../models/ContactModel')
const Task = require('../models/TaskModel')

// @desc    Show add page
// @route   GET /job/add
exports.showAddJob = async (req, res) => {
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

// @desc    Process add form
// @route   POST /jobs
exports.createJob = async (req, res) => {
    console.log("request body: ", req.body)
    try {
        // Get user id
        const uniqID = await req.user.id
        // Extract data from req.body
        const { companyName, contactName, jobTitle, jobURL, jobDescription, jobLocation, jobNotes } = req.body
        // Initiallize variables
        let sourceCompanyId;
        let sourceContactId;
        // Check if company exists
        if (company === "newCompany" && newCompany && newCompany.companyName) {
            // If company does not exist, create new company
            const newCompany = await Company.create({
                userId: uniqID,
                companyName: companyName,
                dateAdded: new Date(),
                url: "",
                role: "",
                roleURL: "",
                position: "",
                source: "",
                pointOfContact: {
                    name: "",
                    position: "",
                    email: "",
                },
                application: {
                    applied: false,
                    applyDate: "",
                    coffeeChat: false,
                    coffeeChatDate: "",
                    saidThanks: false,
                    interviewDate: "",
                    followUpDate: "",
                },
                comments: "",
            })
            // Set sourceCompanyId to newCompany._id
            sourceCompanyId = newCompany._id
        } else {
            // If company exists, set sourceCompanyId to company._id
            sourceCompanyId = companyName
        }
        // Check if contact exists
        if (contactName === "newContact" && newContact && newContact.contactName) {
            // If contact does not exist, create new contact
            const newContact = await Contact.create({
                userId: uniqID,
                contactName: contactName,
                dateAdded: new Date(),
                position: "",
                email: "",
                company: "",
                companyURL: "",
                comments: "",
            })
            // Set sourceContactId to newContact._id
            sourceContactId = newContact._id
        } else {
            // If contact exists, set sourceContactId to contact._id
            sourceContactId = contactName
        }
        // Create new job
        const job = await Job.create({
            userId: uniqID,
            companyName: sourceCompanyId,
            contactName: sourceContactId,
            jobTitle: jobTitle,
            jobURL: jobURL,
            jobDescription: jobDescription,
            jobLocation: jobLocation,
            jobNotes: jobNotes,
        })
        console.log("Job Data has been added!")
        console.log(job)
        res.redirect("/jobs")
    } catch (err) {
        console.log(err)
    }
}

// @desc    Show sorted jobs
// @route   GET /jobs
exports.showJobs = async (req, res) => {
    try {
        const sort = req.query.sort;
        const sortDirection = sort === "asc" ? 1 : sort === "desc" ? -1 : 1;
        const jobs = await Job.find({ userId: req.user.id }).lean().sort({ dateAdded: sortDirection })
        res.render("job.ejs", {
            jobs,
            sort,
        })
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }
}