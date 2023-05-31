import Client from "../../database"

export type Order = {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    status: Boolean
}
//maybe include the foreign key types in the Order object
export class AllOrders {
    // index CRUD Method (Reads)
    async index (): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }
    // show CRUD Method (Updates)
    async show (id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }
    // create CRUD Method (Creates)
    async create (o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [o.productId, o.quantity, o.userId, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add product ${o.productId}. Error: ${err}`)
        }
    }
    // delete CRUD Method (Deletes)
    async delete (id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}.  Error: ${err}`)
        }
    }

    async addProduct (quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [quantity, orderId, productId])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}
