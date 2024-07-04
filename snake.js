let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("snakemove.mp3");
const gameoversound = new Audio("gameover2.mp3");
const movesound = new Audio("snakefood.mp3");
const musicsound = new Audio("backgroundmusic.mp3");
let speed = 8;
let lastPaintTime = 0;
let snakearr = [{ x: 9, y: 9 }];
food = { x: 6, y: 7 };
bomb = { x: 13, y: 17 };
let score = 0;
//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function iscollide(snake) {
  //if you bump into yourself
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if you bump into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  //if you collide with a bomb
  if (snakearr[0].y === bomb.y && snakearr[0].x === bomb.x) {
    return true;
  }
}
function gameEngine() {
  //part1: updating a snake variable
  if (iscollide(snakearr)) {
    gameoversound.play();
    musicsound.pause();
    let inputDir = { x: 0, y: 0 };
    alert("Game Khatam . Press any key to playagain!");

    snakearr = [{ x: 9, y: 9 }];
    musicsound.play();
    gameoversound.pause();
    score = 0;
  }
  //if you have eaten food increament the score and regenerate the food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    score += 1;
    scorebox.innerHTML = "Score:" + score;
    foodsound.play();
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    bomb = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //snake move karna h
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;
  updatedisplay();
}
//display the snake and food
//display the snake
function updatedisplay() {
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
  //display the Bomb
  bombElement = document.createElement("div");
  bombElement.style.gridRowStart = bomb.y;
  bombElement.style.gridColumnStart = bomb.x;
  bombElement.classList.add("bomb");
  board.appendChild(bombElement);
}

//mainn logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 }; //startthe game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("arrowup");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("arrowdown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("arrowleft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("arrowright");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
