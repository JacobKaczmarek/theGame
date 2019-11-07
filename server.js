const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = require('socket.io')(server);

let players = {};
let bullets = [];
io.on('connection', (socket) => {
    let id = socket.id;
    players[id] = { x: null, y: null };

    socket.on('updatePlayer', (position) => {
        players[id] = position;
    });

    socket.on('newBullet', (bullet) => {
        bullets.push(bullet);
    });

    socket.on('hit', () => {
        delete players[id];
    });

    socket.on('disconnect', () => {
        delete players[id];
    });
});

setInterval(() => {
    bullets.forEach((bullet) => moveBullet(bullet));
    bullets = bullets.filter((bullet) => !outOfScreen(bullet));
    io.sockets.emit('heartbeat', { players, bullets });
}, 10);

moveBullet = (bullet) => {
    bullet.x += bullet.velX;
    bullet.y += bullet.velY;
};

const width = 800;
const height = 600;
outOfScreen = (bullet) => {
    if (bullet.x > width || bullet.x < 0 || bullet.y < 0 || bullet.y > height) {
        return true;
    } else {
        return false;
    }
};
