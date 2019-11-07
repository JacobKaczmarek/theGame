class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.shotCooldown = 0.2;
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
                mouseY
            );
            this.currentShotCooldown = this.shotCooldown;
        }
        return bullet ? bullet : false;
    }

    isHit(bullets) {
        let distance;
        let hit = false;
        bullets.forEach((bullet) => {
            distance = this.getDistance(
                bullet.x,
                bullet.y,
                player.position.x,
                player.position.y
            );
            if (distance < player.size + 20) {
                hit = true;
            }
        });
        return hit;
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
    }

    draw() {
        ellipse(this.position.x, this.position.y, this.size);
    }
}
