const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
let d;
let message = "";
let score = 0;
let speed = 150; // Starting speed (Zyada number = Slow speed)

function changeDirection(newDir) {
    if (newDir == "LEFT" && d != "RIGHT") d = "LEFT";
    else if (newDir == "UP" && d != "DOWN") d = "UP";
    else if (newDir == "RIGHT" && d != "LEFT") d = "RIGHT";
    else if (newDir == "DOWN" && d != "UP") d = "DOWN";
}

document.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) changeDirection("LEFT");
    else if(e.keyCode == 38) changeDirection("UP");
    else if(e.keyCode == 39) changeDirection("RIGHT");
    else if(e.keyCode == 40) changeDirection("DOWN");
});

// Game loop ko manage karne ke liye function
function gameLoop() {
    draw();
    setTimeout(gameLoop, speed);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#27ae60" : "#2ecc71";
        ctx.beginPath();
        ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2 - 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Score: " + score, 10, 25);
    ctx.fillText(message, 150, 25);

    if (d) {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            // Har food ke baad speed badhayein (Speed kam hogi toh game fast hoga)
            if (speed > 50) speed -= 5; 
            
            food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
            message = "Good!";
            setTimeout(() => message = "", 1000);
        } else {
            snake.pop();
        }

        if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400) {
            alert("Game Over! Score: " + score);
            location.reload();
        }

        let newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
    }
}

// Game shuru karein
gameLoop();