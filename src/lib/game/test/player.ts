import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./state";

class Player {
    gameWidth: number;
    gameHeight: number;

    states: (StandingLeft | StandingRight | SittingLeft | SittingRight | RunningLeft | RunningRight | JumpingRight | JumpingLeft | FallingLeft | FallingRight)[];
    currentState: StandingLeft | StandingRight;

    image: HTMLImageElement;
    width: number;
    height: number;

    x: number;
    y: number;
    vy: number;
    weight: number;

    frameX: number;
    frameY: number;

    maxFrame: number;

    speed: number;
    maxSpeed: number;

    fps: number;
    frameTimer: number;
    frameInterval: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.states = [new StandingRight(this), new StandingLeft(this), new SittingRight(this), new SittingLeft(this), new RunningRight(this), new RunningLeft(this), new JumpingRight(this), new JumpingLeft(this), new FallingRight(this), new FallingLeft(this)];
        this.currentState = this.states[0];

        this.image = document.createElement("img");
        this.image.src = "/assets/dog.png";

        this.width = 200;
        this.height = 181.83;

        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;

        this.vy = 0;
        this.weight = 1;

        this.frameX = 0;
        this.frameY = 0;

        this.maxFrame = 6;

        this.speed = 0;
        this.maxSpeed = 10;

        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    draw(ctx: CanvasRenderingContext2D, deltaTime: number) {

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        ctx.drawImage(
            this.image,
            this.width * this.frameX, // 자를 이미지의 x좌표
            this.height * this.frameY, // 자를 이미지의 y좌표
            this.width, // 자를 이미지의 너비
            this.height, // 자를 이미지의 높이
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(input: string) {
        this.currentState.handleInput(input);
        this.x += this.speed;

        if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        if (this.x <= 0) this.x = 0;

        this.y += this.vy;

        const ground = this.onGround()

        if (!ground) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;
        }

    }

    setState(state: number) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}

export default Player;
