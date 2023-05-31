"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../api/models/product");
const store = new product_1.AllProducts();
describe("All Users", () => {
    it("should have product index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have product show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have product create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have product delete method", () => {
        expect(store.delete).toBeDefined();
    });
});
