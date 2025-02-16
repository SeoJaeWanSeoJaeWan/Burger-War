import Core from "../core";

class Object {
  core: Core | null = null;
  width: number = 0;
  height: number = 0;

  constructor(core: Core) {
    this.core = core;
  }

  updateSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export default Object;
