const Company = require("../models/CompanyModel")

// @desc    Show add page
// @route   GET /company/addCompany
exports.showAddPage = (req, res) => {
  res.render("addCompany.ejs")
}

// @desc    Process add form
// @route   POST /company
exports.createCompany = async (req, res) => {
  console.log("request body:", req.body)
  try {
    // extract the user id from the request
    const uniqID = await req.user.id
    // extract the data from the request body
    const { contactId, jobId, companyName, url, companyDescription, comments } = req.body
    // create a new company object
    const company = await Company.create({
      userId: uniqID,
      contactId,
      jobId,
      companyName,
      url,
      companyDescription,
      comments
    });
    // save the company object to the database
    await company.save();
    // send a success message and update the page
    res.status(201).json({
      success: true,
      message: "Company created",
      data: company,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error while creating company",
      error: err.message,
    });
  }
};

// @desc    Show all companies
// @route   GET /companies
// exports.showAllCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find({ userId: req.user.id }).lean()
//     res.render("company.ejs", {
//       companies,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render("error/500")
//   }
// }

// @desc    Show sorted company
// @route   GET /company
exports.showSortedCompanies = async (req, res) => {
  try {
    // extract the sort direction from the request query
    const sort = req.query.sort;
    // set the sort direction
    const sortDirection = sort === "asc" ? 1 : sort === "desc" ? -1 : 1;
    //  extract the user id from the request
    const uniqID = await req.user.id
    // retrieve the companies from the database along with the associated contactIds and jobIds
    const companies = await Company.find({ userId: uniqID })
      .populate("contactId")
      .populate("jobId")
      .sort({ companyName: sortDirection })
      .lean()

    // console.log(companies)
    res.render("company.ejs", {
      companies,
      sort
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error while retrieving companies",
      error: err.message,
    });
  }
}

// @desc    Show edit page
// @route   GET /companies/edit/:id
exports.showEditPage = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
    }).lean()
    if (!company) {
      return res.render("error/404")
    }
    if (company.userId != req.user.id) {
      res.redirect("/company")
    } else {
      console.log(company)
      res.render("editCompany.ejs", {
        company,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
}

// @desc    Update company
// @route   PUT /company/:id
exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id).lean()
    console.log(company)
    if (!company) {
      return res.render("error/404")
    }
    if (company.userId != req.user.id) {
      res.redirect("/company")
    } else {
      company = await Company.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
      res.redirect("/company")
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
}

// @desc    Delete company
// @route   DELETE /company/:id
exports.deleteCompany = async (req, res) => {
  try {
    await Company.remove({ _id: req.params.id })
    console.log("Company has been deleted!")
    res.redirect("/company")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
}
