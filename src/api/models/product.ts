import Client from "../../database"

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class AllProducts {
    static index: any;
    // index CRUD Method (Reads)
    async index (): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }
    // show CRUD Method (Updates)
    async show (id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }
    // create CRUD Method (Creates)
    async create (p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [p.name, p.price])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }
    // delete CRUD Method (Deletes)
    async delete (id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}.  Error: ${err}`)
        }
    }
}
