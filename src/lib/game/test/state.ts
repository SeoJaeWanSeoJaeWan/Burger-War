import Player from "./player";

export const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    SITTING_RIGHT: 2,
    SITTING_LEFT: 3,
    RUNNING_RIGHT: 4,
    RUNNING_LEFT: 5,
    JUMPING_RIGHT: 6,
    JUMPING_LEFT: 7,
}

type StateType = keyof typeof states;

class State {
    state: StateType;

    constructor(state: StateType) {
        this.state = state;
    }
}

export class StandingRight extends State {
    player: Player;

    constructor(player: Player) {
        super("STANDING_RIGHT");

        this.player = player;
    }

    enter() {
        this.player.frameY = 0;
        this.player.speed = 0;
    }

    handleInput(input: string) {
        if (input === "PRESS left") {
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === "PRESS right") {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class StandingLeft extends State {
    player: Player;

    constructor(player: Player) {
        super("STANDING_LEFT");

        this.player = player;
    }

    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
    }

    handleInput(input: string) {
        if (input === "PRESS right") {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === "PRESS left") {
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class SittingRight extends State {
    player: Player;

    constructor(player: Player) {
        super("SITTING_RIGHT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 8;
    }

    handleInput(input: string) {
        if (input === "PRESS left") {
            this.player.setState(states.SITTING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(states.STANDING_RIGHT);
        } else if (input === "RELEASE down") {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    player: Player;

    constructor(player: Player) {
        super("SITTING_LEFT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 9;
    }

    handleInput(input: string) {
        if (input === "PRESS right") {
            this.player.setState(states.SITTING_RIGHT);
        } else if (input === "PRESS up") {
            this.player.setState(states.STANDING_LEFT);
        } else if (input === "RELEASE down") {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class RunningRight extends State {
    player: Player;

    constructor(player: Player) {
        super("RUNNING_RIGHT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
    }

    handleInput(input: string) {
        if (input === "PRESS left") {
            this.player.setState(states.RUNNING_LEFT);
        } else if (input === "RELEASE right") {
            this.player.setState(states.STANDING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    player: Player;

    constructor(player: Player) {
        super("RUNNING_LEFT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
    }

    handleInput(input: string) {
        if (input === "PRESS right") {
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input === "RELEASE left") {
            this.player.setState(states.STANDING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    player: Player;

    constructor(player: Player) {
        super("JUMPING_RIGHT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 2;
        this.player.vy -= 20;
    }

    handleInput(input: string) {
    }
}

export class JumpingLeft extends State {
    player: Player;

    constructor(player: Player) {
        super("JUMPING_LEFT");
        this.player = player;
    }

    enter() {
        this.player.frameY = 3;
        this.player.vy -= 20;
    }

    handleInput(input: string) {
    }
}
