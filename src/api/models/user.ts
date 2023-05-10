// @ts-ignore
import Client from '../database'

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class Users {
    // index CRUD Method (Reads)
    async index (): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }
    // show CRUD Method (Updates)
    async show (id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
    // create CRUD Method (Creates)
    async create (u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [u.firstName, u.lastName, u.password])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstName} ${u.lastName}. Error: ${err}`)
        }
    }
    // delete CRUD Method (Deletes)
    async delete (id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}.  Error: ${err}`)
        }
    }
}
