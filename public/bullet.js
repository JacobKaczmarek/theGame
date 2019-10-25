class Bullet {
    constructor(x, y, targetX, targetY) {
        this.speed = 10;
        this.size = 20;
        this.position = createVector(x, y);
        let target = createVector(targetX, targetY);
        let direction = target.sub(this.position);
        this.velocity = direction.limit(this.speed);
    }

    move() {
        this.position = this.position.add(this.velocity);
    }

    isOutOfScreen() {
        if (
            this.position.x > width ||
            this.position.x < 0 ||
            this.position.y < 0 ||
            this.position.y > height
        ) {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        ellipse(this.position.x, this.position.y, this.size);
    }
}
