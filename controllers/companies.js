const Company = require("../models/Company");

module.exports = {
  getCompanies: async (req, res) => {
    console.log(req.user);
    try {
      const companyList = await Company.find({ userId: req.user.id });
      res.render("companies.ejs", {
        companies: companyList,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createCompany: async (req, res) => {
    try {
      console.log(req);
      await Company.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      console.log("Company has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  editCompany: async (req, res) => {
    try {
      await Company.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteCompany: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Company.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Company");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
