const express = require('express')
const cors = require('cors');
const app = express()
const crypto = require('crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 3000

//GET   
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const { genre } = req.query
    if(genre) {
        const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)
    res.status(404).json({message: 'movie not found'})
})

//POST
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

//PATCH
app.patch('/movies/:id', (req, res) => {
    
    const result = validatePartialMovie(req.body)

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return res.status(404).json({ message: 'movie not found' })

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})


app.use(cors()) //use corse middleware
//DELETE
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return res.status(404).json({ message: 'movie not found' })
    movies.splice(movieIndex, 1)
    return res.json({ message: 'movie deleted' })
})
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
