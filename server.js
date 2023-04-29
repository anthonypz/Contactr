const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const methodOverride = require("method-override");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
// const taskRoutes = require("./routes/tasks");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
const sendfeedbackRoutes = require("./routes/sendfeedback");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport");

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

// // Debugging
// app.use((req, res, next) => {
//   console.log(`Request method: ${req.method}, path: ${req.path}`);
//   next();
// });
// app.use((req, res, next) => {
//   console.log("Request body: ", req.body);
//   next();
// });

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
// app.use("/todos", todoRoutes);
app.use("/companies", companyRoutes);
// app.use("/tasks", taskRoutes);
app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);
app.use("/sendfeedback", sendfeedbackRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port http://localhost:${process.env.PORT}`
  );
});
