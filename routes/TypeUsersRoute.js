const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const typeUserModel = require("../models/TypeUsers.js");

// Create TypeUsers
router.post("/typeUsers/create", async (req, res) => {
    const typeUser = new typeUserModel({name: req.body.name});
    await typeUser.save()
        .then((u) => res.json({status: "ok", id: u._id}))
        .catch((e) => res.status(400).json(e));
});

// Read TypeUsers
router.get("/typeUsers/all", async (_req, res) => {
    const response = await typeUserModel.find();
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "typeUsers/not-found"});
});

// Read One TypeUsers
router.get("/typeUsers/:id", async function (req, res) {
    const response = await typeUserModel.findById(mongoose.Types.ObjectId(req.params.id));
    (response) ? res.json({
        status: "ok",
        data: response
    }) : res.status(404).json({error: "typeUsers/typeUser-not-found"});
});

// Update TypeUsers
router.put("/typeUsers/update/:id", async (req, res) => {
    const response = await typeUserModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {name: req.body.name});
    (response) ? res.json({
        status: "ok",
        description: "typeUser updated"
    }) : res.status(404).json({error: "typeUsers/typeUser-not-found"});
});

// Delete TypeUsers
router.delete("/typeUsers/delete/:id", async (req, res) => {
    const response = await typeUserModel.findByIdAndDelete(req.params.id);
    (response) ? res.json({
        status: "ok",
        description: "typeUser deleted"
    }) : res.status(404).json({error: "typeUsers/typeUser-not-found"});
});

module.exports = router;