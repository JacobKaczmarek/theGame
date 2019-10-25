class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.shotCooldown = 1;
        this.currentShotCooldown = 0;
        this.size = 80;
        this.speed = 5;
    }

    move() {
        // Move up when w pressed
        if (keyIsDown(87) && this.position.y > this.size / 2) {
            this.position.y -= this.speed;
        }
        // Move down when s pressed
        if (keyIsDown(83) && this.position.y < height - this.size / 2) {
            this.position.y += this.speed;
        }
        // Move left when a pressed
        if (keyIsDown(65) && this.position.x > this.size / 2) {
            this.position.x -= this.speed;
        }
        // Move right when d pressed
        if (keyIsDown(68) && this.position.x < width - this.size / 2) {
            this.position.x += this.speed;
        }
        if (this.currentShotCooldown > 0) {
            this.currentShotCooldown -= 1 / 60;
        }
    }

    shoot() {
        let bullet;
        if (mouseIsPressed && this.currentShotCooldown <= 0) {
            bullet = new Bullet(
                this.position.x,
                this.position.y,
                mouseX,
                mouseY,
            );
            this.currentShotCooldown = this.shotCooldown;
        }
        return bullet ? bullet : false;
    }

    draw() {
        ellipse(this.position.x, this.position.y, this.size);
    }
}
