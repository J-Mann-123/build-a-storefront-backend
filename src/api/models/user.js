"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsers = void 0;
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AllUsers {
    // index CRUD Method (Reads)
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    // show CRUD Method (Updates)
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    // create CRUD Method (Creates)
    async create(u) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn
                .query(sql, [u.firstName, u.lastName, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.firstName} ${u.lastName}. Error: ${err}`);
        }
    }
    // delete CRUD Method (Deletes)
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}.  Error: ${err}`);
        }
    }
    async authenticate(firstName, lastName, password) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
        const result = await conn.query(sql, [firstName, lastName]);
        const pepper = process.env.BCRYPT_PASSWORD;
        console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.AllUsers = AllUsers;
