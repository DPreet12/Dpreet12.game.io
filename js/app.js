const gameNew = document.getElementById("game");
const ctx = gameNew.getContext("2d");
let speed = 100;

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
            this.x += this.xVel;
            this.y += this.yVel; // for the towards x and y co-ardinates
            
        }
    }
}


window.addEventListener("DOMContentLoaded", function() {
   
snake = new Chracter(200,200,"black", 50, 50, 0, 0);

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
   snake.updatePosition()
    snake.render()
    
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