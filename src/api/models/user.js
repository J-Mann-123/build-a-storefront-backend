"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class Users {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.rekease();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
}
exports.Users = Users;
