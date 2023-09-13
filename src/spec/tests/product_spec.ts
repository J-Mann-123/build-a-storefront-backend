import { AllProducts, Product } from '../../api/models/product';

const store = new AllProducts()

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
    it("should return the list of the products", async () => {
        const productList: Product[] = await AllProducts.index();
        expect(productList).toEqual([
            {
                id: 1,
                name: 'bucket',
                price: 12,
            }
        ])
    })
})