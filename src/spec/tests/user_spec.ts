import { AllUsers, User } from '../../api/models/user';

const store = new AllUsers();

describe("All Users", () => {
    it("should have user index method", async () => {
        const users = await store.index();
        expect(users).toBeDefined();
    });

    it("should have user show method", async () => {
        const userId = '1';
        const user = await store.show(userId);
        expect(user).toBeDefined();
    });

    it("should have user create method", async () => {
        const newUser = {
            id: 2,
            firstName: 'Test',
            lastName: 'User',
            password: 'TestPassword',
        };
        const createdUser = await store.create(newUser);
        expect(createdUser).toBeDefined();
    });

    it("should have user delete method", async () => {
        const userIdToDelete = '2';
        const deletedUser = await store.delete(userIdToDelete);
        expect(deletedUser).toBeDefined();
    });

    it("should have user authenticate method", async () => {
        const firstName = "John";
        const lastName = "Doe"
        const password = "TestPassword";
        const authenticatedUser = await store.authenticate(firstName, lastName, password);
        expect(authenticatedUser).toBeDefined();
    });
    it("should return the list of the products", async () => {
        const users: User[] = await AllUsers.index();
        expect(users).toEqual([
            {
                id: 2,
                firstName: 'Luke',
                lastName: 'Skywalker',
                password: 'VaderStinks',
            }
        ])
    })
})