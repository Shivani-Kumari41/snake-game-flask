const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake, food, d, score, speed, gameInterval;

// Game initialize karne ka function
function initGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
    d = undefined;
    score = 0;
    speed = 150;
}

function resetGame() {
    initGame();
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, speed);
}

// ... (changeDirection aur eventListener waise hi rehne dein) ...

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

    if (d) {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            if (speed > 50) speed -= 5;
            food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
        } else {
            snake.pop();
        }

        if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400) {
            clearInterval(gameInterval);
            alert("Game Over! Score: " + score);
            resetGame();
            return;
        }

        let newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
    }
}

// Pehli baar game shuru karein
initGame();
gameInterval = setInterval(draw, speed);