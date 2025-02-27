import Core from "./core";

class Character {
    core: Core;

    img: HTMLImageElement;

    width: number;
    height: number;

    x: number;
    y: number;
    vy: number;
    weight: number;

    speed: number;
    maxSpeed: number;

    constructor(core: Core) {
        this.core = core;

        this.img = new Image();
        this.img.src = "/assets/player.png";

        this.width = 100;
        this.height = 91.3;

        this.x = 0;
        this.y = core.height - this.height;

        this.vy = 0;
        this.weight = 0.5;

        this.speed = 0;
        this.maxSpeed = 10;
    }

    update(input: string[]) {
        this.x += this.speed;
        this.y += this.vy;

        if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else this.speed = 0;

        if (this.x < 0) this.x = 0;
        else if (this.x > this.core.width - this.width) this.x = this.core.width - this.width;


        if (input.includes("ArrowUp") && this.onGround()) this.vy -= 10;
        else if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
    }

    onGround() {
        return this.y >= this.core.height - this.height;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export default Character;
