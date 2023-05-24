import express, { Request, Response } from 'express'
import { User, AllUsers } from '../models/user'

const store = new AllUsers()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(items)
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
}

export default user_routes
