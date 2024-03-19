window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  snake = [];
  positionX = 10;
  positionY = 10;
  foodX = 15;
  foodY = 15;
  velocityX = 0;
  velocityY = 0;
  grid = 20;
  size = 3;
  score = 0;

  //game function call every 100 milliseconds
  setInterval(jogo, 100);

  //controlls for desktop
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      //right arrow 39
      case 39:
        velocityX = 1;
        velocityY = 0;
        break;
      // left arrow 37
      case 37:
        velocityX = -1;
        velocityY = 0;
        break;
      //up arrow 38
      case 38:
        velocityX = 0;
        velocityY = -1;
        break;
      //arrow down 40
      case 40:
        velocityX = 0;
        velocityY = 1;
        break;
    }
  });

  // Show controls only on mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("controls").style.display = "block";
  }

  //controlls for mobile
  document.getElementById("up-btn").addEventListener("click", function () {
    velocityX = 0;
    velocityY = -1;
  });

  document.getElementById("left-btn").addEventListener("click", function () {
    velocityX = -1;
    velocityY = 0;
  });

  document.getElementById("right-btn").addEventListener("click", function () {
    velocityX = 1;
    velocityY = 0;
  });

  document.getElementById("down-btn").addEventListener("click", function () {
    velocityX = 0;
    velocityY = 1;
  });
};

function jogo() {
  // Resets the snake's size and score when starting the match
  if (snake.length === 0) {
    size = 3;
    score = 0;
  }

  // Check to see if the snake has returned to its initial size
  if (size === 3) {
    score = 0; // Restarts scoring when the snake returns to its initial size
  }

  //screen configuration
  ctx.fillStyle = "#2980b9";

  //horizontal edge distance, vertical edge distance, width, height
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //snake movement
  positionX += velocityX;
  positionY += velocityY;

  // mirroring
  if (positionX < 0) {
    positionX = grid;
  }
  if (positionX > grid) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = grid;
  }
  if (positionY > grid) {
    positionY = 0;
  }

  //configuring the snake
  ctx.fillStyle = "#00f102";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
    if (snake[i].x == positionX && snake[i].y == positionY) {
      size = 3;
    }
  }

  //snake positioning
  snake.push({ x: positionX, y: positionY });

  // deleting
  while (snake.length > size) {
    snake.shift();
  }

  //configuring the food
  ctx.fillStyle = "#f1c40f";
  ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1);

  //eating the food
  if (positionX == foodX && positionY == foodY) {
    size++;
    score++; //Increases points
    foodX = Math.floor(Math.random() * grid);
    foodY = Math.floor(Math.random() * grid);
  }

  // Exibe a pontuação na tela
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Points: " + score, 10, 30);
}