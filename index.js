const express = require('express');
const app = express();
const PORT = 8080;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cors
const cors = require('cors');
app.use(cors());

// init db client
const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



/* 
Pseudocode:

Function getAllVideoGames:
    1. Send a GET request to the API endpoint that lists all video games.
    2. If the request is successful:
        a. Parse the response.
        b. Return the list of all video games.
    3. Otherwise, handle the error or exception accordingly.
End Function


Function getVideoGameById(id):
    1. Check if ID is provided.
    2. Send a GET request to the API endpoint that retrieves video games, appending the given ID to the endpoint.
    3. If the request is successful:
        a. Parse the response.
        b. Return the video game data.
    4. Otherwise, handle the error or exception accordingly.
End Function


Function createVideoGame(videoGameData):
    1. Check if videoGameData is provided and is valid.
    2. Send a POST request to the API endpoint responsible for creating video games.
        a. Attach videoGameData as the request payload.
    3. If the request is successful:
        a. Parse the response.
        b. Return the created video game data.
    4. Otherwise, handle the error or exception accordingly.
End Function


Function updateVideoGame(id, updatedVideoGameData):
    1. Check if ID and updatedVideoGameData are provided and are valid.
    2. Send a PUT request to the API endpoint responsible for updating video games, appending the given ID to the endpoint.
        a. Attach updatedVideoGameData as the request payload.
    3. If the request is successful:
        a. Parse the response.
        b. Return the updated video game data.
    4. Otherwise, handle the error or exception accordingly.
End Function


Async Function deleteVideoGame(id):
    1. Check if ID is provided.
    2. Send a DELETE request asynchronously to the API endpoint responsible for deleting video games, appending the given ID to the endpoint.
    3. If the request is successful:
        a. Return a success message or the status of deletion.
    4. Otherwise, handle the error or exception accordingly.
End Async Function
*/