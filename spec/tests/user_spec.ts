import { AllUsers } from '../../src/api/models/user';

const store = new AllUsers()

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
})