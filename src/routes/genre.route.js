import express from 'express';
import {
    createGenre,
    getAllGenres,
    updateGenre,
    deleteGenre,
    getGenreByName,
    getFilmsByGenre,
} from '../controllers/genre.controller.js';

const genreRouter = express.Router();

genreRouter.post('/', createGenre);
genreRouter.get('/', getAllGenres);
genreRouter.get('/name/:name', getGenreByName);
genreRouter.get('/:id/films', getFilmsByGenre);
genreRouter.put('/:id', updateGenre);
genreRouter.delete('/:id', deleteGenre);

export default genreRouter;