import express, { Request, Response } from 'express'
import { User, AllUsers } from '../models/user'
import jwt from 'jsonwebtoken'

const store = new AllUsers()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }

        const newUser = await store.create(user)
        const tokenSecret: string = process.env.TOKEN_SECRET as string;
        var token = jwt.sign({ user: newUser }, tokenSecret);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
        return
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }
        const tokenSecret: string = process.env.TOKEN_SECRET as string;
        const u = await store.authenticate(user.firstName, user.lastName, user.password)
        var token = jwt.sign({ user: u }, tokenSecret);
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/user/:id', show)
    app.post('/newUser', create)
    app.delete('/deleted/:id', destroy)
    app.get('/user/:id', authenticate)
}

export default userRoutes
