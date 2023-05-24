import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import user_routes from './api/handlers/user'
import { User, AllUsers } from './api/models/user'

// const cors = require('cors')
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: "https://apple.com",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

user_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

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

// app.put('/user/:id', (req: Request, res: Response) => {
//     const newUser: User = {
//         id: req.params.id,
//         firstName: req.body.title,
//         lastName: req.body.content
//     }
//     try {
//         updateUser(newUser);
//         res.send('this is the EDIT route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

app.delete('/user/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')

    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
