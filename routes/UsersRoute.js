const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userModel = require("../models/Users.js");

// Create Users
router.post("/users/create", async (req, res) => {
    const user = new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        typeUser: req.body.typeUser,
        dni: req.body.dni,
        status: req.body.status
    });
    await user.save()
        .then((u) => res.json({status: "ok", id: u._id}))
        .catch((e) => res.status(400).json(e));
});

// Read Users
router.get("/users/all", async (_req, res) => {
    const response = await userModel.find();
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "users/not-found"});
});

// Read One Users
router.get("/users/:id", async function (req, res) {
    const response = await userModel.findById(mongoose.Types.ObjectId(req.params.id));
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "users/user-not-found"});
});

// Update Users
router.put("/users/update/:id", async (req, res) => {
    const response = await userModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        typeUser: req.body.typeUser,
        dni: req.body.dni,
        status: req.body.status
    });
    (response) ? res.json({
        status: "ok",
        description: "user updated"
    }) : res.status(404).json({error: "users/user-not-found"});
});

// Delete Users
router.delete("/users/delete/:id", async (req, res) => {
    const response = await userModel.findByIdAndDelete(req.params.id);
    (response) ? res.json({
        status: "ok",
        description: "user deleted"
    }) : res.status(404).json({error: "users/user-not-found"});
});

// Read Users By DNI
router.get("/users/dni/:dni", async (req, res) => {
    const response = await userModel.find({dni: req.params.dni});
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "users/not-found"});
});

// Read Users By Email And Password
router.get("/users/email/:email/password/:password", async (req, res) => {
    const response = await userModel.find({email: req.params.email, password: req.params.password});
    (response) ? res.json({status: "ok", data: response}) : res.status(404).json({error: "users/not-found"});
});

module.exports = router;