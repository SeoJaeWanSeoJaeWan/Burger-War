import Core from "./core";
import { Falling, Jumping, Running, Sitting } from "./state";

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

    states: (Sitting | Running | Jumping | Falling)[];
    currentState: (Sitting | Running | Jumping | Falling);

    frameX: number;
    frameY: number;

    maxFrame: number;
    fps: number;
    frameInterval: number;
    frameTimer: number;

    constructor(core: Core) {
        this.core = core;

        this.img = new Image();
        this.img.src = "/assets/player.png";

        this.width = 100.3;
        this.height = 91.3;

        this.x = 0;
        this.y = core.height - this.height - this.core.groundMargin;

        this.vy = 0;
        this.weight = 0.5;

        this.speed = 0;
        this.maxSpeed = 10;

        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];

        this.currentState.enter();

        this.frameX = 0;
        this.frameY = 3;

        this.maxFrame = 6;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(input: Keys[], deltaTime: number) {
        this.currentState.handleInput(input);

        this.x += this.speed;
        this.y += this.vy;

        if (!input.includes("ArrowDown") && input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else if (!input.includes("ArrowDown") && input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else this.speed = 0;

        if (this.x < 0) this.x = 0;
        else if (this.x > this.core.width - this.width) this.x = this.core.width - this.width;

        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    onGround() {
        return this.y >= this.core.height - this.height - this.core.groundMargin;
    }

    setState(state: number, speed: number) {
        this.currentState = this.states[state];
        this.core.speed = this.core.maxSpeed * speed;
        this.currentState.enter();
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export default Character;
