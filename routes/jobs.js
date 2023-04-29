const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show add page
// @route   GET /jobs/add
router.get("/add", ensureAuth, jobController.showJobs);

// @desc    Process add form
// @route   POST /jobs
// router.post("/addJob", ensureAuth, jobController.createJob);

// @desc    Show sorted jobListings
// @route   GET /jobs
// router.get("/", ensureAuth, jobController.showSortedJobs);

// @desc    Show edit page
// @route   GET /jobs/edit/:id
// router.get("/edit/:id", ensureAuth, jobController.showEditPage);

// @desc    Update job
// @route   PUT /jobs/:id
// router.put("/:id", ensureAuth, jobController.updateJob);

// @desc    Delete job
// @route   DELETE /jobs/:id
// router.delete("/:id", ensureAuth, jobController.deleteJob);


module.exports = router;