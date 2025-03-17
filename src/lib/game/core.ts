
import Background from "./background";
import Character from "./character";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy";
import Input from "./input";

class Core {
    //
    width: number;
    height: number;
    groundMargin: number;

    speed: number;
    maxSpeed: number;

    // Objects
    character: Character;
    background: Background;

    input: Input;

    enemies: (FlyingEnemy | GroundEnemy | ClimbingEnemy)[];
    enemyTimer: number;
    enemyInterval: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.groundMargin = 120;

        this.speed = 3;
        this.maxSpeed = 3;

        this.character = new Character(this);
        this.background = new Background(this);

        this.input = new Input();

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
    }

    update(deltaTime: number) {
        this.background.update();
        this.character.update(this.input.keys, deltaTime);
        //
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);

            if (enemy.markedForDeletion) {
                this.enemies = this.enemies.filter(e => e !== enemy);
            }
        })
    }

    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context);
        this.character.draw(context);

        this.enemies.forEach(enemy => {
            enemy.draw(context);
        })
    }

    addEnemy() {
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

        this.enemies.push(new FlyingEnemy(this));
    }

    checkDebug() {
        return this.input.keys.includes("d");
    }
}

export default Core;
