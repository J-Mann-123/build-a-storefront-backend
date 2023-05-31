"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new product_1.AllProducts();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const tokenSecret = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(token, tokenSecret);
    }
    catch (err) {
        res.sendStatus(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/newProduct', create);
    app.delete('/deleted/:id', destroy);
};
exports.default = productRoutes;
