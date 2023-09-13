import { AllOrders, Order } from '../../api/models/order';

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
    it("should return the list of the products", async () => {
        const orders: Order[] = await AllOrders.index();
        expect(orders).toEqual([
            {
                id: 2,
                productId: 3,
                quantity: 100,
                userId: 234,
                status: true,
            }
        ])
    })
})