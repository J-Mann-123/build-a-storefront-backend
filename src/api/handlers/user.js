"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.AllUsers();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const tokenSecret = process.env.TOKEN_SECRET;
        var token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        return;
    }
};
const authenticate = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const tokenSecret = process.env.TOKEN_SECRET;
        const u = await store.authenticate(user.firstName, user.lastName, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/user/:id', show);
    app.post('/newUser', create);
    app.delete('/deleted/:id', destroy);
    app.get('/user/:id', authenticate);
};
exports.default = userRoutes;
