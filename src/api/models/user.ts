// @ts-ignore
import Client from '../database'

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class Users {
    async index (): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.rekease()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }
}
