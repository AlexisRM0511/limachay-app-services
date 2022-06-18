const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const statusModel = require("../models/Status.js");

// Create Status
router.post("/status/create", async (req, res) => {
    const status = new statusModel({name: req.body.name});
    await status.save()
        .then((u) => res.json({status: "ok", id: u._id}))
        .catch((e) => res.status(400).json(e));
});

// Read Status
router.get("/status/all", async (_req, res) => {
    const response = await statusModel.find();
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "status/not-found"});
});

// Read One Status
router.get("/status/:id", async function (req, res) {
    const response = await statusModel.findById(mongoose.Types.ObjectId(req.params.id));
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "status/status-not-found"});
});

// Update Status
router.put("/status/update/:id", async (req, res) => {
    const response = await statusModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {name: req.body.name});
    (response) ? res.json({
        status: "ok",
        description: "status updated"
    }) : res.status(404).json({error: "status/status-not-found"});
});

// Delete Status
router.delete("/status/delete/:id", async (req, res) => {
    const response = await statusModel.findByIdAndDelete(req.params.id);
    (response) ? res.json({
        status: "ok",
        description: "status deleted"
    }) : res.status(404).json({error: "status/status-not-found"});
});

module.exports = router;