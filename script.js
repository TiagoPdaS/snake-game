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
  //game function call every 100 milliseconds
  setInterval(jogo, 100);

  //controles para desktop
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

  //controles para dispositivos móveis
  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // horizontal movement
      if (xDiff > 0) {
        // swiped left
        velocityX = -1;
        velocityY = 0;
      } else {
        // swiped right
        velocityX = 1;
        velocityY = 0;
      }
    } else {
      // vertical movement
      if (yDiff > 0) {
        // swiped up
        velocityX = 0;
        velocityY = -1;
      } else {
        // swiped down
        velocityX = 0;
        velocityY = 1;
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
};

function jogo() {
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
    foodX = Math.floor(Math.random() * grid);
    foodY = Math.floor(Math.random() * grid);
  }
}
