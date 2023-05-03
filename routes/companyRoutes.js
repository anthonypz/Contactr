const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show add page
// @route   GET /company/add
router.get("/add", ensureAuth, companyController.showAddPage);

// @desc    Process add form
// @route   POST /company
router.post("/addCompany", ensureAuth, companyController.createCompany);

// @desc    Show sorted companies
// @route   GET /company
router.get("/", ensureAuth, companyController.showSortedCompanies);

// @desc    Show edit page
// @route   GET /company/edit/:id
router.get("/edit/:id", ensureAuth, companyController.showEditPage);

// @desc    Update company
// @route   PUT /company/:id
router.put("/:id", ensureAuth, companyController.updateCompany);

// @desc    Delete company
// @route   DELETE /company/:id
router.delete("/:id", ensureAuth, companyController.deleteCompany);


module.exports = router;
