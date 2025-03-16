import Core from "./core";

class Layer {
    core: Core;

    speedModifier: number;

    image: HTMLImageElement;

    x: number;
    y: number;
    constructor(core: Core, speedModifier: number, image: HTMLImageElement) {
        this.core = core;

        this.speedModifier = speedModifier;

        this.image = image;

        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x < -this.core.width) this.x = 0;
        else this.x -= this.core.speed * this.speedModifier;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.core.width, this.core.height);
        context.drawImage(this.image, this.x + this.core.width, this.y, this.core.width, this.core.height);
    }
}

const images = [
    "/assets/layer-1.png",
    "/assets/layer-2.png",
    "/assets/layer-3.png",
    "/assets/layer-4.png",
    "/assets/layer-5.png"
]

class Background {
    core: Core;

    width: number;
    height: number;

    layer5Images: Layer[];


    constructor(core: Core) {
        this.core = core;

        this.width = this.core.width;
        this.height = this.core.height;

        this.layer5Images = images.map((image, idx) => {
            const img = new Image();
            img.src = image;
            return new Layer(this.core, idx * 0.2, img);
        });

    }

    update() {
        this.layer5Images.forEach((layer) => layer.update());
    }

    draw(context: CanvasRenderingContext2D) {
        this.layer5Images.forEach((layer) => layer.draw(context));
    }
}

export default Background;