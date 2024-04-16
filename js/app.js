const gameNew = document.getElementById("game");
const ctx = gameNew.getContext("2d");
let speed = 5;
const yourScore = document.getElementById("score");
let snakeArr = [];
let gameOver = false;
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
food = new Chracter(350, 150, "red", 20, 20);
playBtn.addEventListener("click", drawInstructions)
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
        //console.log(snakeArr[i])
        //console.log(snakeArr[i].x)
        //console.log(snakeArr[i].y)
    }
      if( gameOver){
        return
      }
    if (walls()) {
        snake.xVel = 0;
        snake.yVel = 0;
        alert("game over")
       gameOver = true;
        return;
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
// function if snake collided with the wall or snake's head collided with its body
function walls() {
  gameOver = false; // game is running
  
  for( let i = 2; i < snakeArr.length; i++) {
    if( snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
        return true;
    }
  }
  if( snakeArr[0].x < 0 || snakeArr[0].x + snakeArr[0].width > gameNew.width || snakeArr[0].y < 0 || snakeArr[0].y + snakeArr[0].height > gameNew.height) {
    return true;
  }
  //return false;
}

// draw instructions at canvas

function drawInstructions() {
    ctx.clearRect(0, 0, gameNew.width, gameNew.height);

    let instructionsDiv = document.createElement("div");
    instructionsDiv.setAttribute("id", "instructions");

    let heading = document.createElement("h2");
    heading.textContent = "Check instructions";
    instructionsDiv.append(heading)
    //console.log(instructionsDiv);

    let textMovement = document.createElement("p");
    textMovement.textContent = " Use arrow keys or (w, s , a d) to move Up, Down, Left & Right"
    instructionsDiv.append(textMovement)

    let obestacles = document.createElement("p");
    obestacles.textContent = " Try to avoid canvas edges and also, do not let touch snake head to its body"
    instructionsDiv.append(obestacles)
     
    let startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    instructionsDiv.append(startBtn);
    startBtn.addEventListener("click", gameInit);
    gameNew.parentNode.appendChild(instructionsDiv);
    
    console.log(instructionsDiv)
}

function gameInit() {
    document.querySelector("#instructions").remove();
    gameLoop();
}