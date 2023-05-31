import express, { Request, Response } from 'express'
import { Product, AllProducts } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new AllProducts()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const authorizationHeader: string = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        const tokenSecret: string = process.env.TOKEN_SECRET as string;
        jwt.verify(token, tokenSecret)
    } catch (err) {
        res.sendStatus(401)
        res.json(`Invalid token ${err}`)
        return
    }

    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/product/:id', show)
    app.post('/newProduct', create)
    app.delete('/deleted/:id', destroy)
}

export default productRoutes
