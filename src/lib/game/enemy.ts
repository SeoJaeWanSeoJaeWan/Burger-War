import Core from "./core";

interface EnemyCreate {
    core: Core;
    width: number;
    height: number;

    x: number;
    y: number;

    speedX: number;
    speedY: number;

    maxFrame: number;

    src: string;

}

class Enemy {
    frameX: number;
    frameY: number;
    fps: number;
    frameInterval: number;
    frameTimer: number;

    core: Core;

    width: number;
    height: number;

    x: number;
    y: number;

    speedX: number;
    speedY: number;

    maxFrame: number;

    image: HTMLImageElement;

    markedForDeletion: boolean;

    constructor(create: EnemyCreate) {
        const { core, width, height, x, y, speedX, speedY, maxFrame, src } = create;

        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.core = core;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speedX = speedX;
        this.speedY = speedY;

        this.maxFrame = maxFrame;

        this.image = new Image();
        this.image.src = src;

        this.markedForDeletion = false;
    }

    update(deltaTime: number) {
        this.x -= this.speedX + this.core.speed;
        this.y += this.speedY;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame)
                this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.core.checkDebug()) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );

    }
}

export class FlyingEnemy extends Enemy {
    angle: number;
    va: number;

    constructor(core: Core) {
        super({
            core: core,
            width: 60,
            height: 44,
            x: core.width + Math.random() * core.width * 0.5,
            y: Math.random() * core.height * 0.5,
            speedX: Math.random() + 1,
            speedY: 0,
            maxFrame: 5,
            src: "/assets/enemy_fly.png"
        });

        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);
    }
}

export class GroundEnemy extends Enemy {
    constructor(core: Core) {
        super({
            core,
            width: 60,
            height: 87,
            x: core.width,
            y: core.height - 87 - core.groundMargin,
            speedX: 0,
            speedY: 0,
            maxFrame: 1,
            src: "/assets/enemy_plant.png",
        });
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(core: Core) {
        super({
            core,
            width: 120,
            height: 144,
            x: core.width,
            y: Math.random() * core.height * 0.5,
            speedX: 0,
            speedY: Math.random() > 0.5 ? 1 : -1,
            maxFrame: 5,
            src: "/assets/enemy_spider_big.png",
        });
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        if (this.y > this.core.height - this.height - this.core.groundMargin) this.speedY *= -1;
        if (this.y < -this.height) this.markedForDeletion = true;
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
    }
}