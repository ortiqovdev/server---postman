import express, { Express, request, response } from "express";
import { User, users } from "./users"
import { v4 } from 'uuid'


const server: Express = express()

server.use(express.json())
server.use(express.urlencoded())

server.post('/users', (request, response) => {
    const newUser: User = {
        id: v4(),
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email
    }
    users.push(newUser)

    response
        .status(200)
        .send("User added")
})


server.get('/users', (request, response) => {
    response
        .status(200)
        .send(users)
})


server.get('/users/:id', (request, response) => {
    const user = users.find(user => user.id = request.params.id)
    if (user == undefined) {
        response
            .status(404)
            .send('Not found')
    } else {
        response
            .status(200)
            .send(user)
    }
})

server.put('/users/:id', (request, response) => {
    const index = users.findIndex(user => user.id == request.params.id)
    if (index == -1) {
        return response
            .status(404)
            .send('Nt found')
    }
    users[index] = {
        id: users[index].id,
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email
    }

    response
        .status(200)
        .send("update")
})
server.delete('/users/:id', (request, response) => {
    const index = users.findIndex(user => user.id == request.params.id)
    if (index == -1) {
        return response
        .status(404)
        .send('Nt found')
    }
    users.splice(index,1)

    response
        .status(200)
        .send("User deleted")
})

server.listen(8000, () => {
    console.log("Server working... (Port : 8000)");

})