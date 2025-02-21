type State = "running" | "jump" | "sit" | "dead";

class Player {
  gameWidth: number;
  gameHeight: number;

  states: State[] = ["running", "jump", "sit", "dead"];
  currentState: State;

  image: HTMLImageElement;
  width: number;
  height: number;

  x: number;
  y: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.states = [];
    this.currentState = this.states[0];

    this.image = document.createElement("img");
    this.image.src = "/assets/dog.png";

    this.width = 200;
    this.height = 181.83;

    this.x = 0;
    this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0, // 자를 이미지의 x좌표
      0, // 자를 이미지의 y좌표
      this.width, // 자를 이미지의 너비
      this.height, // 자를 이미지의 높이
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export default Player;
