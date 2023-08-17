const client = require('./client');
const util = require('util');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videoGames;
        `);
        return videoGames;
    } catch (error) {
        throw error;
    }
}

// GET - /api/video-games/:id - get a single video game by id
// (this one is already correct)

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    const { title, genre, platform, releaseDate } = body; // Assume these fields; adjust as per your table schema

    try {
        const { rows: [newGame] } = await client.query(`
            INSERT INTO videoGames(title, genre, platform, releaseDate) 
            VALUES($1, $2, $3, $4) 
            RETURNING *;
        `, [title, genre, platform, releaseDate]);
        return newGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    const { title, genre, platform, releaseDate } = fields; // Again, adjust based on your schema
    try {
        const updateFields = [title, genre, platform, releaseDate, id]; 
        const { rows: [updatedGame] } = await client.query(`
            UPDATE videoGames SET 
            title = $1, genre = $2, platform = $3, releaseDate = $4 
            WHERE id = $5 
            RETURNING *;
        `, updateFields);
        return updatedGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rowCount } = await client.query(`
            DELETE FROM videoGames WHERE id = $1;
        `, [id]);
        return rowCount > 0; // Returns true if a row was deleted, false otherwise
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    //getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}
