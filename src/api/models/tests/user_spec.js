"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const store = new user_1.AllUsers();
describe("All Users", () => {
    it("should have all of the users", () => {
        expect(store.index).toBeDefined();
    });
    it("should return user", () => {
        expect(store).toEqual([]);
    });
});
