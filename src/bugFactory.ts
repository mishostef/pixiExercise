import * as PIXI from "pixi.js";

export function addLegs(container: PIXI.Container) {
  const legTexture = PIXI.Texture.from("../assets/leg.png");
  const leftLeg1 = PIXI.Sprite.from(legTexture);
  const leftLeg2 = PIXI.Sprite.from(legTexture);
  const leftLeg3 = PIXI.Sprite.from(legTexture);
  const rightLeg1 = PIXI.Sprite.from(legTexture);
  const rightLeg2 = PIXI.Sprite.from(legTexture);
  const rightLeg3 = PIXI.Sprite.from(legTexture);
  const legs = [leftLeg1, leftLeg2, leftLeg3, rightLeg1, rightLeg2, rightLeg3];
  legs.forEach((leg, i) => {
    leg.anchor.set(1, 0.25);
    if (i < 3) {
      leg.scale.set(0.3, 0.3);
    } else {
      leg.scale.set(-0.3, 0.3);
    }
    leg.rotation = Math.PI / 2;
  });
  legs[0].position.set(-25, -20);
  legs[1].position.set(-10, -20);
  legs[2].position.set(5, -15);
  legs[3].position.set(-25, 20);
  legs[4].position.set(-10, 20);
  legs[5].position.set(5, 15);
  legs.forEach((leg) => container.addChild(leg));
  return legs;
}

export function addBody(container: PIXI.Container) {
  const body = new PIXI.Graphics();

  body.beginFill(0x000000);
  body.drawCircle(-12, 0, 25);
  body.drawCircle(25, 0, 20);
  body.endFill();

  const leftWing = drawWing(-35, -10, Math.PI / 12);
  const rightWing = drawWing(-35, 10, -Math.PI / 12);
  const leftAntenna = drawAntenna(45, 0, true);
  const rightAntenna = drawAntenna(45, 0, false);

  container.addChild(body);
  container.addChild(rightWing);
  container.addChild(leftWing);
  container.addChild(leftAntenna);
  container.addChild(rightAntenna); 
}

export function addEyes(container: PIXI.Container) {
  const eyes = new PIXI.Container();
  const leftSclera = drawSclera(10, 15);
  const rightSclera = drawSclera(10, 25);
  const leftPupil = drawPupil(leftSclera);
  const rightPupil = drawPupil(rightSclera);
  leftSclera.addChild(leftPupil);
  rightSclera.addChild(rightPupil);
  eyes.addChild(leftSclera);
  eyes.addChild(rightSclera);
  eyes.setTransform(5, -40);
  container.addChild(eyes);
  return [leftPupil, rightPupil];
}
function drawSclera(x, y) {
  const sclera = new PIXI.Graphics();
  sclera.beginFill(0xffffff);
  sclera.drawCircle(x, y, 7);
  sclera.endFill();
  sclera.x = x;
  sclera.y = y;
  return sclera;
}
function drawPupil(sclera: PIXI.Graphics) {
  const pupil = new PIXI.Graphics();
  pupil.beginFill(0x000000);
  pupil.drawCircle(0, 0, 5);
  pupil.endFill();
  pupil.x = sclera.x;
  pupil.y = sclera.y;
  return pupil;
}

function drawWing(x, y, angle) {
  const rightWing = new PIXI.Graphics();
  rightWing.beginFill(0x9a33ff, 0.5);
  rightWing.drawEllipse(x, y, 50, 20);
  rightWing.rotation = angle;
  rightWing.endFill();
  return rightWing;
}

function drawAntenna(startX, startY, isleft) {
  const antenna = new PIXI.Graphics();
  const coeff = isleft ? 1 : -1;
  antenna
    .lineStyle(3, 0x350000)
    .moveTo(startX, startY)
    .bezierCurveTo(
      startX + 9,
      startY - 10 * coeff,
      startX - 5,
      startY - 28 * coeff,
      startX + 9,
      startY - 34 * coeff
    );
  return antenna;
}