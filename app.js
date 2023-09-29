import express, { json } from 'express';
import cors from 'cors';
import { moviesRouter } from './routes/movies-routes.js';
const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors())
const PORT = process.env.PORT ?? 3000

app.use('/movies', moviesRouter)

// Define OPTIONS route for handling preflight requests
app.options('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PATCH', 'DELETE')
    res.sendStatus(200)
})

app.use((req, res) => { //middleware para todas las acciones
    res.status(404).send('<h1>movie not found</h1>')
})

app.listen(PORT, () =>
console.log(`listening port ${PORT}`))
