const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// GET route to fetch data
router.get("/data", apiController.getData);

// POST route to add new data
router.post("/data", apiController.addData);

router.get("/data/:id", apiController.getDataById);

router.put("/data/:id", apiController.updateData);

// DELETE route to delete data
router.delete("/data/:id", apiController.deleteData);

module.exports = router;
