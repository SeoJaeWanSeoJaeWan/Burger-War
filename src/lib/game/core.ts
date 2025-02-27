import Background from "./background";
import Character from "./character";
import Enemy from "./enemy";
import Input from "./input";
import Item from "./item";

class Core {
    //
    width: number;
    height: number;

    // Objects
    character: Character;

    //
    input: Input;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.character = new Character(this);

        this.input = new Input();
    }

    update() {
        this.character.update(this.input.keys);
    }

    draw(context: CanvasRenderingContext2D) {
        this.character.draw(context);
    }
}

export default Core;
