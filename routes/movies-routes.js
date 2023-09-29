import { Router } from "express"; //router crea un enrutador a partir del cual podemos responder a todos los path
import { MovieController } from "../controllers/movies-controller.js";

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', MovieController.update)