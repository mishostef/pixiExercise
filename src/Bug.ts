import * as PIXI from "pixi.js";
import { addBody, addEyes, addLegs } from "./bugFactory";
export class Bug {
  container: PIXI.Container;
  legs: PIXI.Sprite[];
  pupuls: PIXI.Graphics[];
  speed: number;
  constructor(x: number, y: number, direction: number, speed: number) {
    this.container = new PIXI.Container();
    this.legs = addLegs(this.container);
    this.container.setTransform(x, y);
    addBody(this.container);
    this.pupuls = addEyes(this.container);
    this.container.rotation = direction;
    this.speed = speed;
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
  }
  private keyDownHandler(e: KeyboardEvent) {
    if (e.key == "ArrowLeft") {
      if (this.direction == 0) {
        this.direction = Math.PI;
      }
      this.container.x--;
    } else if (e.key == "ArrowRight") {
      if (this.direction == Math.PI) {
        this.direction = 0;
      }
      this.container.x++;
    }
  }

  get position() {
    return this.container.position;
  }
  get direction() {
    return this.container.rotation;
  }
  set direction(value) {
    this.container.rotation = value;
  }

  animateEyes(time) {
    this.pupuls.forEach(
      (pupil) => (pupil.y = pupil.y + Math.sin(time / 20) / 7)
    );
  }
  animateLegs(time) {
    this.legs.forEach((leg, i) => {
      if ([0, 2, 3, 5].includes(i)) {
        leg.rotation = Math.PI / 2 + Math.sin(time / 5) * (Math.PI / 12);
      } else {
        leg.rotation = Math.PI / 2 - Math.sin(time / 5) * (Math.PI / 12);
      }
    });
  }
}
