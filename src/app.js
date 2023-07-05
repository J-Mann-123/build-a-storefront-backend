"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./api/handlers/user"));
const user_2 = require("./api/models/user");
// const cors = require('cors')
const app = (0, express_1.default)();
const corsOptions = {
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middleware' });
});
(0, user_1.default)(app);
app.get('/user', (_req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/user/:id', (_req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/user', async (req, res) => {
    const newUser = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    const allUsers = new user_2.AllUsers();
    try {
        const createdUser = await allUsers.create(newUser);
        res.status(201).json(createdUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
app.delete('/user/:id', (_req, res) => {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
