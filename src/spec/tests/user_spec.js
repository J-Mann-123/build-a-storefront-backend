"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../api/models/user");
const store = new user_1.AllUsers();
describe("All Users", () => {
    it("should have user index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have user show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have user create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have user delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("should have user authenticate method", () => {
        expect(store.authenticate).toBeDefined();
    });
});
