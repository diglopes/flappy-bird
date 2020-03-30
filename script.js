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

const floor = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  positionX: 0,
  positionY: canvas.height - 112,
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

    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.positionX + this.width,
      this.positionY,
      this.width,
      this.height
    );
  }
};

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  positionX: 0,
  positionY: canvas.height - 204,
  draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.positionX + this.width,
      this.positionY,
      this.width,
      this.height
    );
  }
};

function renderLoop() {
  background.draw();
  floor.draw();
  flappyBird.draw();
  requestAnimationFrame(renderLoop);
}

renderLoop();
