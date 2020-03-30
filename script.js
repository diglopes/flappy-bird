const sprites = new Image();
sprites.src = "./assets/sprites.png";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  positionX: 10,
  positionY: 50,
  draw() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
};

function renderLoop() {
  flappyBird.draw();
  requestAnimationFrame(renderLoop);
}

renderLoop();
