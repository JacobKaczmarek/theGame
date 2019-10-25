const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = require('socket.io')(server);

let players = [];

io.on('start', player => {
    console.log('hi');
    console.log(player);
    players.push(player);
});

io.on('connection', socket => console.log(socket.id));
