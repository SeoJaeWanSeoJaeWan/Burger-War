
class Input {
    keys: Keys[];

    constructor() {
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Enter")
                && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
                // debug
            } else if (e.key === 'd') {
                const index = this.keys.indexOf("d");;
                if (index !== -1) {
                    this.keys.splice(index, 1);
                } else {
                    this.keys.push(e.key);
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            if ((e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Enter")
                && this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}

export default Input;