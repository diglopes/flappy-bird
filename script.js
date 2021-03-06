const sprites = new Image();
sprites.src = "./assets/images/sprites.png";

const makeAudio = src => {
  const audio = new Audio();
  audio.src = src;
  return audio;
};

const sounds = {
  hit: makeAudio("./assets/sounds/hit.wav")
};

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

function floorCollision(flappyBird, floor) {
  const flappyBirdY = flappyBird.positionY + flappyBird.height;
  const floorY = floor.positionY;
  if (flappyBirdY >= floorY) {
    return true;
  }

  return false;
}

const gameVariables = {};

const makeFlappyBird = () => ({
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  positionX: 10,
  positionY: 50,
  gravity: 0.25,
  speed: 0,
  flyingRate: 7.6,
  gameOver: false,
  movements: [
    {spriteX: 0, spriteY: 0}, // wings up
    {spriteX: 0, spriteY: 26}, // wings at the middle
    {spriteX: 0, spriteY: 52}, //wings down
  ],
  fly() {
    this.speed -= this.flyingRate;
  },
  currentFrame: 0,
  updateCurrentFrame(frame) {
    if(frame % 10 === 0 && !this.gameOver) {
      const incrementBase = 1;
      const increment = incrementBase + frame
      const repetitionBase = this.movements.length
      this.currentFrame = increment % repetitionBase
    }
  },
  draw() {
    
    const {spriteX, spriteY} = this.movements[this.currentFrame]
    ctx.drawImage(
      sprites,
      spriteX,
      spriteY,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  },
  updatePositionY() {
    if (!this.gameOver) {
      if (floorCollision(this, gameVariables.floor)) {
        this.gameOver = true;
        sounds.hit.play();
        setTimeout(() => {
          activeScreen.changeTo(screens.start);
        }, 1000);
        return;
      }
      this.speed = this.speed + this.gravity;
      this.positionY += this.speed;
    }
  }
});

const makeFloor = () => ({
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

    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.positionX + this.width * 2,
      this.positionY,
      this.width,
      this.height
    );
  },
  updatePositionX() {
    this.positionX -= 1;
    if (this.positionX === -this.width) {
      this.positionX = 0;
    }
  }
});

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

    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.positionX + this.width * 2,
      this.positionY,
      this.width,
      this.height
    );
  },
  updatePositionX() {
    this.positionX -= 0.4;
    if (this.positionX <= -this.width) {
      this.positionX = 0;
    }
  }
};

const getReadyMessage = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  positionX: canvas.width / 2 - 174 / 2,
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

const activeScreen = {
  screen: null,
  changeTo(currentScreen) {
    this.screen = currentScreen;
    if (currentScreen.initialize) {
      currentScreen.initialize();
    }
  }
};

const screens = {
  start: {
    initialize() {
      gameVariables.flappyBird = makeFlappyBird();
      gameVariables.floor = makeFloor()
    },
    draw() {
      background.draw();
      gameVariables.floor.draw();
      gameVariables.flappyBird.draw();
      getReadyMessage.draw();
    },
    update() {},
    click() {
      activeScreen.changeTo(screens.game);
    }
  },
  game: {
    draw() {
      background.draw();
      gameVariables.floor.draw();
      gameVariables.flappyBird.draw();
    },
    click() {
      gameVariables.flappyBird.fly();
    },
    update() {
      if (!gameVariables.flappyBird.gameOver) {
        gameVariables.floor.updatePositionX();
        background.updatePositionX();
      }
      gameVariables.flappyBird.updatePositionY();
    }
  }
};

let frame = 0
function renderLoop() {
  frame++
  gameVariables.flappyBird.updateCurrentFrame(frame)
  activeScreen.screen.draw();
  activeScreen.screen.update();
  requestAnimationFrame(renderLoop);
}

canvas.addEventListener("click", () => {
  if (activeScreen.screen.click) {
    activeScreen.screen.click();
  }
});

activeScreen.changeTo(screens.start);
renderLoop();
