const gameNew = document.getElementById("game");
const ctx = gameNew.getContext("2d");

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

snake = new Chracter(200,200,"black", 50, 50, 0, 0);
snake.render()
food = new Chracter(350, 150, "red", 20, 20)
food.render()