const express = require('express');
const router = express.Router();

const { 
    getAllVideoGames,
    //getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame 
} = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id); // Extract the id from the request parameters
        if(videoGame) {
            res.send(videoGame);
        } else {
            res.status(404).send('Video game not found'); 
        }
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        const newGame = await createVideoGame(req.body); // Assuming the new video game's data is sent in the request body
        res.status(201).send(newGame); // 201 means "Created"
    } catch (error) {
        next(error);
    }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        const updatedGame = await updateVideoGame(req.params.id, req.body); 
        if(updatedGame) {
            res.send(updatedGame);
        } else {
            res.status(404).send('Video game not found to update');
        }
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await deleteVideoGame(req.params.id);
        if(result) { 
            res.status(204).send(); // 204 means "No Content" (successful deletion)
        } else {
            res.status(404).send('Video game not found to delete');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
