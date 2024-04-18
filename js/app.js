const gameNew = document.getElementById("game");
const ctx = gameNew.getContext("2d");
let speed = 5;
const yourScore = document.getElementById("score");
let snakeArr = [];
let gameOver = false;
const movement = document.getElementById("movement");
const highScore = document.getElementById("highScore");
const biteSound = new Audio("./music/food.mp3");
const endSound = new Audio("./music/gameover.mp3");
const appleImage = document.getElementById("apple");
let newImage;


//canvas height and width
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
            this.y += this.yVel  ; // for the towards x and y co-ardinates
            
        }
    }
}

class ImageClass {
  constructor(x, y, image, width, height) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.width = width;
      this.height =height;
      this.alive = true;

      this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
 }
}



window.addEventListener("DOMContentLoaded", function() {
   
snake = new Chracter(250,200,"black", 50, 50, 0, 0);
snakeArr.push(snake);

newImage = new ImageClass(350, 150, appleImage, 40, 40);
playBtn.addEventListener("click", drawInstructions);
endBtn.addEventListener("click", restart)
gameLoop()

});

// game will run in a loop in this function
function gameLoop() {
    ctx.clearRect(0, 0, gameNew.width, gameNew.height); // to clear the canvas
    
    if( gameOver){
        setTimeout(function(){
            movement.textContent = "Snake is dead!";
            movement.style.color = "red";
        }, 100)

        newScore = 0;
        yourScore.textContent = `Score: ${newScore}`

        return
      }
      
      setTimeout(gameLoop, 1000/speed)

      if(newImage.alive) {
        newImage.render()
    }


    for( let i = (snakeArr.length - 1); i > 0; i--){ // backward loop for snake segments
        snakeArr[i].x = snakeArr[i -1].x;
        snakeArr[i].y = snakeArr[i - 1].y
       
    }
      
    if (walls()) {
      
      snake.xVel = 0;
      snake.yVel = 0;
      endSound.play()
      alert("game over")
      
     gameOver = true;
      return;
  }

    snakeArr[0].x += snake.xVel * snake.width
    snakeArr[0].y += snake.yVel * snake.height
 
  

snake.updatePosition()
    //snake.render()

    for( let i = 0; i < snakeArr.length; i++){
      snakeArr[i].render();
    }
    findFood()

    newHighScore = Number(localStorage.getItem("recordScore"));
    highScore.textContent = `Record: ${newHighScore}`;
}

// update snake movement using arrow keys but not  allow  the snake to movw in a opposite direction


const upward = 38;
const downward = 40;
const right = 39;
const left = 37;


document.addEventListener("keydown", control)

function control(e) {
  if((e.keyCode === upward || e.key === "w") && snake.yVel !== 1) {
    snake.yVel = -1;
    snake.xVel = 0; 
}else if ((e.keyCode === downward || e.key === "s") && snake.yVel !== -1) {
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
yourScore.textContent = `Score: ${newScore}`;

let newHighScore = Number(highScore.textContent);
highScore.textContent = `Record: ${newHighScore}`

console.log("-----",newScore)

function findFood() {
    if ( snake.y + snake.height > newImage.y &&
    snake.y < newImage.y + newImage.height &&
     snake.x + snake.width > newImage.x &&
    snake.x < newImage.x + newImage.width) {
       newScore += 5;
       yourScore.textContent = `Score: ${newScore}`
       biteSound.play()

     if( newScore > newHighScore){
       newHighScore = newScore;
       localStorage.setItem("recordScore", newHighScore.toString());
       //highScore.textContent = `Record: ${newHighScore}`;
     }
      growSnake()
       newImage.x = Math.floor(Math.random() * (gameNew.width - 70));
       
       newImage.y = Math.floor(Math.random() * (gameNew.height - 120));
 newImage.alive = true;

    }
}

// now need to grow the snake when it collides with newImage

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
  if( snakeArr[0].x <= 0 || snakeArr[0].x + snakeArr[0].width > gameNew.width || snakeArr[0].y <= 0 || snakeArr[0].y + snakeArr[0].height > gameNew.height) {
    return true;
  }
  
}

// draw instructions at canvas


function drawInstructions() {

    ctx.clearRect(0, 0, gameNew.width, gameNew.height);

    let instructionsDiv = document.createElement("div");
    instructionsDiv.setAttribute("id", "instructions");

    let heading = document.createElement("h2");
    heading.textContent = "Check instructions";
    //heading.style.color = "red";
    instructionsDiv.append(heading)
    //console.log(instructionsDiv);

    let textMovement = document.createElement("p");
    textMovement.textContent = " Use arrow keys or (w, s , a d) to move Up, Down, Left & Right"
    instructionsDiv.append(textMovement)

    let obestacles = document.createElement("p");
    obestacles.textContent = " Try to avoid canvas edges and also, do not let touch snake head to its body"
    instructionsDiv.append(obestacles)


    let startBtn = document.createElement("button");
    startBtn.setAttribute("id", "startBtn")
    startBtn.textContent = "Start Game";
    
    startBtn.addEventListener("click", gameInit);
    instructionsDiv.append(startBtn);
    gameNew.parentNode.appendChild(instructionsDiv);
    
    //console.log(instructionsDiv)
}

function gameInit() {
  
  
 
    document.querySelector("#instructions").remove();
   
   
   startBtn.removeEventListener("click", gameInit)
   
    gameLoop();
}

function restart() {
  if( gameOver) {
    
    snake.x = 250;
    snake.y = 200;
    newImage.x = 350;
    newImage.y = 150;
    snakeArr = [snake];
    gameOver = false;
    movement.textContent = "Snake lives"
    movement.style.color ="#C5C6C7";
   
  }
  gameLoop()
}