import { AllOrders } from '../../src/api/models/order';

const store = new AllOrders()

describe("All Users", () => {
    it("should have order index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have order show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have order create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have order delete method", () => {
        expect(store.delete).toBeDefined();
    });
})