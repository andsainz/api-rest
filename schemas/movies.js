import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'movie title must be a string',
        required_error: 'movie titlte is required'
    }),
    year: z.number().int().min(1900).max(2023),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    genre: z.string()
})

export function validateMovie(object){
    return movieSchema.safeParse(object)
}

export function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object) //todas las propiedades opcionales, si están, las valida
}