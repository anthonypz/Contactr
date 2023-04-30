const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show add page
// @route   GET /job/add
router.get("/add", ensureAuth, jobController.showAddJob);

// @desc    Process add form
// @route   POST /job
router.post("/addJob", ensureAuth, jobController.createJob);

// @desc    Show sorted jobList
// @route   GET /job
router.get("/", ensureAuth, jobController.showJobs);

// @desc    Show edit page
// @route   GET /job/edit/:id
// router.get("/edit/:id", ensureAuth, jobController.showEditPage);

// @desc    Update job
// @route   PUT /job/:id
// router.put("/:id", ensureAuth, jobController.updateJob);

// @desc    Delete job
// @route   DELETE /job/:id
// router.delete("/:id", ensureAuth, jobController.deleteJob);


module.exports = router;