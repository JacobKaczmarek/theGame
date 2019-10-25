let player;
let bullet;
let bullets;
let socket = io.connect('http://localhost:3000');

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    noStroke();
    bullets = [];
    player = new Player(400, 300);

    socket.emit('start', 'hello');
}

function draw() {
    background(50);
    player.move();
    player.draw();
    bullet = player.shoot();
    if (bullet) {
        bullets.push(bullet);
    }
    bullets.forEach(bullet => {
        bullet.move();
        bullet.draw();
    });
    bullets = bullets.filter(bullet => !bullet.isOutOfScreen());
}
