const Demo = require("../models/Demo");

module.exports = {
  getDemos: async (req, res) => {
    console.log(req.user);
    try {
      const demoData = await Demo.find({ userId: req.user.id });
      res.render("demo.ejs", {
        demos: demoData,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  createDemo: async (req, res) => {
    console.log(req.user);
    try {
      const demoArr = await Demo.find({});
      const uniqID = await req.user.id;
      await Demo.create({
        userId: uniqID,
        companyName: req.body.companyName,
        dateAdded: req.body.dateAdded,
        url: req.body.url,
        role: req.body.role,
        roleURL: req.body.roleURL,
        position: req.body.position,
        source: req.body.source,
        pointOfContact: {
          name: req.body.pocName,
          position: req.body.pocPosition,
          email: req.body.pocEmail,
        },
        application: {
          applied: req.body.applied,
          date: req.body.date,
          coffeeChat: req.body.coffeeChat,
          coffeeChatDate: req.body.coffeeChatDate,
          saidThanks: req.body.saidThanks,
          interviewDate: req.body.interviewDate,
          followUp: req.body.followUp,
        },
        comments: req.body.comments,
      });
      console.log("Demo Data has been added!");
      res.redirect("/demo");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Demo.findOneAndUpdate(
        { _id: req.body.demoIdFromJSFile },
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
  markIncomplete: async (req, res) => {
    try {
      await Demo.findOneAndUpdate(
        { _id: req.body.demoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteDemo: async (req, res) => {
    console.log(req.body.demoIdFromJSFile);
    try {
      await Demo.findOneAndDelete({ _id: req.body.demoIdFromJSFile });
      console.log(`Deleted Demo`);
      res.json(`Deleted It ${req.body.demoIdFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
};
