import Background from "./background";
import Character from "./character";
import Enemy from "./enemy";
import Item from "./item";

class Core {
  speed: number = 0;
  score: number = 0;
  level: number = 0;

  //
  width: number = 0;
  height: number = 0;

  // Objects
  character: Character | null = null;
  background: Background | null = null;
  enemies: Enemy[] = [];
  items: Item[] = [];

  constructor(width: number, height: number) {
    this.reset();

    this.updateSize(width, height);
  }

  characterSize(width: number, height: number) {
    const cWidth = width / 20;
    const cHeight = height / 20;

    return {
      width: cWidth,
      height: cHeight,
    };
  }

  backgroundSize(width: number, height: number) {
    const bWidth = width;
    const bHeight = height;

    return {
      width: bWidth,
      height: bHeight,
    };
  }

  enemySize(width: number, height: number) {
    const eWidth = width / 25;
    const eHeight = height / 25;

    return {
      width: eWidth,
      height: eHeight,
    };
  }

  updateSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    const characterSize = this.characterSize(width, height);
    const backgroundSize = this.backgroundSize(width, height);
    const enemySize = this.enemySize(width, height);

    this.character!.updateSize(characterSize.width, characterSize.height);
    this.background!.updateSize(backgroundSize.width, backgroundSize.height);

    this.enemies.forEach((enemy) => {
      enemy.updateSize(enemySize.width, enemySize.height);
    });
  }

  reset() {
    this.speed = 1;
    this.score = 0;
    this.level = 0;
    this.character = new Character(this);
    this.background = new Background(this);
    this.enemies = [];
  }
}

export default Core;
