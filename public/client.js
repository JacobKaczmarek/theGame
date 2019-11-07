let player;
let players;
let bullet;
let bullets;
let id;
let alive = true;
let socket = io.connect('192.168.1.39:3000');

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    noStroke();
    bullets = [];
    player = new Player(400, 300);

    socket.on('heartbeat', (data) => {
        players = data.players;
        bullets = data.bullets;
    });
}

function draw() {
    background(50);
    if (player.isHit(bullets)) {
        socket.emit('hit');
        alive = false;
    }
    if (alive) {
        bullet = player.shoot();
        if (bullet) {
            socket.emit('newBullet', bullet.simplify());
        }
        // Draw other players
        // Draw bullets
        bullets.forEach((bullet) => {
            ellipse(bullet.x, bullet.y, 20);
        });
        fill(255, 0, 0);
        for (let enemy in players) {
            if (enemy != socket.id) {
                ellipse(players[enemy].x, players[enemy].y, 80);
            }
        }
        fill(255);
        // Controll player
        player.move();
        player.draw();
        socket.emit('updatePlayer', {
            x: player.position.x,
            y: player.position.y
        });
    } else {
        text('Game Over', width / 2, height / 2);
    }
}
