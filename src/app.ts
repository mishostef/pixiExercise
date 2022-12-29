import * as PIXI from "pixi.js";
import { Bug } from "./Bug";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xcccccc,
});
document.body.appendChild(app.view as HTMLCanvasElement);

const bug = new Bug(300, 300, 0, 7);

app.stage.addChild(bug.container);
const line = new PIXI.Graphics(); //
app.stage.addChild(line); //
let angleA = 0;
let angleB = 0;

app.ticker.add(update);

let elapsed = 0;

function update(dt) {
  elapsed += dt;
  bug.animateEyes(elapsed);
  bug.animateLegs(elapsed);
}

function rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
  let point: { x?: number; y?: number } = {};
  point.x = pointX + Math.cos(angle) * distanceX;
  point.y = pointY + Math.sin(angle) * distanceY;
  return point;
}
