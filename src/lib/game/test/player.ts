import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight } from "./state";

class Player {
    gameWidth: number;
    gameHeight: number;

    states: (StandingLeft | StandingRight | SittingLeft | SittingRight | RunningLeft | RunningRight | JumpingRight | JumpingLeft)[];
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

    speed: number;
    maxSpeed: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.states = [new StandingRight(this), new StandingLeft(this), new SittingRight(this), new SittingLeft(this), new RunningRight(this), new RunningLeft(this), new JumpingRight(this), new JumpingLeft(this)];
        this.currentState = this.states[0];

        this.image = document.createElement("img");
        this.image.src = "/assets/dog.png";

        this.width = 200;
        this.height = 181.83;

        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;

        this.vy = 0;
        this.weight = 0.5;

        this.frameX = 0;
        this.frameY = 0;

        this.speed = 0;
        this.maxSpeed = 10;
    }

    draw(ctx: CanvasRenderingContext2D) {
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

        if (this.y < this.gameHeight - this.height) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
    }

    setState(state: number) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

export default Player;
