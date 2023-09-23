import { AllOrders, Order } from '../../api/models/order';

const store = new AllOrders()

describe("All Users", () => {
    let orderIdToDelete;

    beforeEach(async () => {
        const newOrderData = {
            customerName: "John Doe",
            products: ["Product A", "Product B"],
        };
        const createdOrder = await store.create(newOrderData);
        orderIdToDelete = createdOrder.id;
    });

    afterEach(async () => {
        if (orderIdToDelete) {
            await store.delete(orderIdToDelete);
        }
    });

    it("should have order index method", async () => {
        const orders = await store.index();
        expect(orders).toBeDefined();
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThan(0);
    });

    it("should have order show method", async () => {
        const order = await store.show(orderIdToDelete);
        expect(order).toBeDefined();
        expect(order.id).toBe(orderIdToDelete);
    });

    it("should have order create method", async () => {
        const newOrderData = {
            customerName: "Jane Smith",
            products: ["Product C", "Product D"],
        };
        const createdOrder = await store.create(newOrderData);
        expect(createdOrder).toBeDefined();
        expect(createdOrder.id).toBeDefined();
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