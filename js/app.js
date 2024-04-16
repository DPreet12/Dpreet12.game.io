const gameNew = document.getElementById("game");
const ctx = gameNew.getContext("2d");
let speed = 5;
const yourScore = document.getElementById("score");
let snakeArr = [];
//get the canvas height and width
gameNew.setAttribute("height", getComputedStyle(gameNew)["height"]); 
gameNew.setAttribute("width", getComputedStyle(gameNew)["width"]);

class Chracter {
    constructor (x, y, color, width, height, xVel, yVel) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.xVel = xVel;
        this.yVel = yVel;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height); // to draw the snake
        }

        this.updatePosition = function() {
            this.x += this.xVel ;
            this.y += this.yVel ; // for the towards x and y co-ardinates
            
        }
    }
}


window.addEventListener("DOMContentLoaded", function() {
   
snake = new Chracter(200,200,"black", 50, 50, 0, 0);
snakeArr.push(snake)
console.log(snake)
food = new Chracter(350, 150, "red", 20, 20)
gameLoop()

});

// game will run in a loop in this function
function gameLoop() {
    ctx.clearRect(0, 0, gameNew.width, gameNew.height); // to clear the canvas
    setTimeout(gameLoop, 1000/speed)
    if(food.alive) {
        food.render()
    }

    for( let i = (snakeArr.length - 1); i > 0; i--){ // backward loop for snake segments
        snakeArr[i].x = snakeArr[i -1].x;
        snakeArr[i].y = snakeArr[i - 1].y
        //snakeArr[i].render()
        console.log(snakeArr[i])
        console.log(snakeArr[i].x)
        console.log(snakeArr[i].y)
    }

    snakeArr[0].x += snake.xVel * snake.width
    snakeArr[0].y += snake.yVel * snake.width
   

   snake.updatePosition()
    snake.render()

    for( let i = 0; i < snakeArr.length; i++){
      snakeArr[i].render();
    }
    findFood()
    
}

// update snake movement using arrow keys but not  allow  the snake to movw in a opposite direction

// maniuplate key codes

const upward = 38;
const downward = 40;
const right = 39;
const left = 37;


document.addEventListener("keydown", control)

function control(e) {
  if((e.keyCode === upward || e.key === "w") && snake.yVel !== 1) {
    snake.yVel = -1;
    snake.xVel = 0; 
}else if ((e.keyCode === downward || e.key === "s") && snake.yVel !==1) {
    snake.yVel = 1;
   snake.xVel = 0;
}else if ((e.keyCode === right || e.key === "d") && snake.xVel !== -1) {
   snake.yVel = 0;
    snake.xVel = 1;
} else if ((e.keyCode === left || e.key === "a") && snake.xVel !== 1) {
    snake.yVel = 0;
   snake.xVel = -1;
}
}

// if snake eats the food, food will disappear and appear back in random location
let newScore = Number(yourScore.textContent);
yourScore.textContent = `Score: ${newScore}`

console.log("-----",newScore)

function findFood() {
    if ( snake.y + snake.height > food.y &&
    snake.y < food.y + food.height &&
     snake.x + snake.width > food.x &&
    snake.x < food.x + food.width) {
       newScore += 5;
       yourScore.textContent = `Score: ${newScore}`
      // food.alive = false;
      growSnake()
       food.x = Math.floor(Math.random() * (gameNew.width - 40));
       console.log(food.x)
       food.y = Math.floor(Math.random() * (gameNew.height - 80));
//food.alive = true;

const color = ["#bada55", "purple", "gold", "blue"];
let randomIndex = Math.floor(Math.random() * (color.length - 1));
let randomColor = color[randomIndex];
food.color = randomColor;
    }
}

// now need to grow the snake when it collides with food

function growSnake() {
   let snakeParts = new Chracter(snake.x, snake.y, "red", snake.width, snake.height);
   snakeArr.push(snakeParts);
   console.log(snakeArr)
}