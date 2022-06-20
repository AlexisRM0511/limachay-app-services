const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const sueModel = require("../models/Sue.js");

// Create Sue
router.post("/sue/create", async (req, res) => {
    const sue = new sueModel({
        user: req.body.user,
        date: req.body.date,
        status: req.body.status,
        description: req.body.description,
        photo: req.body.photo
    });
    await sue.save()
        .then((u) => res.json({status: "ok", id: u._id}))
        .catch((e) => res.status(400).json(e));
});

// Read Sue
router.get("/sue/all", async (_req, res) => {
    const response = await sueModel.find();
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "sue/not-found"});
});

// Read One Sue
router.get("/sue/:id", async function (req, res) {
    const response = await sueModel.findById(mongoose.Types.ObjectId(req.params.id));
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "sue/tryst-not-found"});
});

// Update Sue
router.put("/sue/update/:id", async (req, res) => {
    const response = await sueModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
        user: req.body.user,
        date: req.body.date,
        status: req.body.status,
        description: req.body.description,
        photo: req.body.photo
    });
    (response) ? res.json({
        status: "ok",
        description: "sue updated"
    }) : res.status(404).json({error: "sue/tryst-not-found"});
});

// Delete Sue
router.delete("/sue/delete/:id", async (req, res) => {
    const response = await sueModel.findByIdAndDelete(req.params.id);
    (response) ? res.json({
        status: "ok",
        description: "sue deleted"
    }) : res.status(404).json({error: "sue/tryst-not-found"});
});

module.exports = router;