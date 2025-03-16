import Character from "./character";


const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
}

class State {
    state: number;
    character: Character;

    constructor(state: number, character: Character) {
        this.state = state;
        this.character = character;
    }
}

export class Sitting extends State {
    constructor(character: Character) {
        super(states.SITTING, character);
    }

    enter() {
        this.character.frameY = 5;
        this.character.maxFrame = 4;
    }

    handleInput(input: string[]) {
        if (input.includes("ArrowDown")) {
            this.character.setState(states.SITTING, 0);
        } else if (!input.includes("ArrowDown")) {
            this.character.setState(states.RUNNING, 1);
        } else if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
            this.character.setState(states.RUNNING, 1)
        } else if (input.includes("ArrowUp")) {
            this.character.setState(states.JUMPING, 1);
        }
    }
}

export class Running extends State {
    constructor(character: Character) {
        super(states.RUNNING, character);
    }

    enter() {
        this.character.frameY = 3;
        this.character.maxFrame = 8;
    }

    handleInput(input: string[]) {
        if (input.includes("ArrowDown")) {
            this.character.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")) {
            this.character.setState(states.JUMPING, 1);
        }
    }
}

export class Jumping extends State {
    constructor(character: Character) {
        super(states.JUMPING, character);
    }

    enter() {
        if (this.character.onGround()) this.character.vy -= 10;

        this.character.frameY = 1;
        this.character.maxFrame = 6;
    }

    handleInput(input: string[]) {
        if (this.character.vy > this.character.weight) {
            this.character.setState(states.FALLING, 1);
        }
    }
}

export class Falling extends State {
    constructor(character: Character) {
        super(states.FALLING, character);
    }

    enter() {
        this.character.frameY = 2;
        this.character.maxFrame = 6;
    }

    handleInput(input: string[]) {
        if (this.character.onGround()) {
            this.character.setState(states.RUNNING, 1);
        }
    }
}