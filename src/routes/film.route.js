import express from 'express';
import {
    createFilm,
    getFilmById,
    getAllFilms,
    updateFilm,
    deleteFilm,
    getFilmReviews
} from '../controllers/film.controller.js';

const filmRouter = express.Router();

filmRouter.post('/', createFilm);
filmRouter.get('/', getAllFilms);
filmRouter.get('/:id', getFilmById);
filmRouter.get('/:id/reviews', getFilmReviews);
filmRouter.put('/:id', updateFilm);
filmRouter.delete('/:id', deleteFilm);

export default filmRouter;