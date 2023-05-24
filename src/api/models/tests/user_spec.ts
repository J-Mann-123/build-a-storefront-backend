import { User, AllUsers } from '../user';

const store = new AllUsers()

describe("All Users", () => {
    it("should have all of the users", () => {
        expect(store.index).toBeDefined();
    });
    // it("should return user", () => {
    //     expect(store).toEqual([]);
    // })
})