const express = require("express");
const router = express.Router();
const demoController = require("../controllers/demo");
const { ensureAuth } = require("../middleware/demoAuth");

// Route Starts /demo/...

router.get("/", ensureAuth, demoController.getDemos);

router.post("/createDemo", demoController.createDemo);

router.put("/markComplete", demoController.markComplete);

router.put("/markIncomplete", demoController.markIncomplete);

router.delete("/deleteDemo", demoController.deleteDemo);

module.exports = router;
