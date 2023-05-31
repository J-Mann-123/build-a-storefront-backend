import express, { Request, Response } from 'express'
import { Order, AllOrders } from '../models/order'

const store = new AllOrders()

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            status: req.body.status,
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/oder/:id', show)
    app.post('/newOrder', create)
    app.delete('/deleted/:id', destroy)
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes
