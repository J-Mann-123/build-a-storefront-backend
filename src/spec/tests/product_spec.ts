import { AllProducts, Product } from '../../api/models/product';

const store = new AllProducts();

describe("All Products", () => {
    it("should have product index method", async () => {
        const products = await store.index();
        expect(products).toBeDefined();
    });

    it("should have product show method", async () => {
        const productId = '1';
        const product = await store.show(productId);
        expect(product).toBeDefined();
    });

    it("should have product create method", async () => {
        const newProductData = {
            id: 1,
            name: "Dummy Product",
            price: 10.99,
        };
        const createdProduct = await store.create(newProductData);
        expect(createdProduct).toBeDefined();
    });

    it("should have product delete method", async () => {
        const productIdToDelete = '1';
        const deletedProduct = await store.delete(productIdToDelete);
        expect(deletedProduct).toBeDefined();
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