import { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import user_routes from './api/handlers/user'
import { User, AllUsers } from './api/models/user'

import { app } from './app';
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: "http://localhost:3000/",
    optionsSuccessStatus: 200
}

export const server = app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', cors(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middleware' })
})

user_routes(app)

app.get('/user', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/user/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/user', async (req: Request, res: Response) => {
    const newUser: User = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    const allUsers = new AllUsers();
    try {
        const createdUser = await allUsers.create(newUser);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(400).json(err);
    }
})

app.delete('/user/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')

    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
