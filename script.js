//your code here
document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const scoreElement = document.getElementById("score");

    const gridSize = 40;
    const cellSize = 10;
    let snake = [{ row: 20, col: 1 }];
    let food = { row: Math.floor(Math.random() * gridSize), col: Math.floor(Math.random() * gridSize) };
    let direction = "right";
    let score = 0;

    function createGrid() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const pixel = document.createElement("div");
                pixel.classList.add("pixel");
                pixel.id = `pixel${row}-${col}`;
                gameContainer.appendChild(pixel);
            }
        }
    }

    function drawSnake() {
        snake.forEach(segment => {
            const pixel = document.getElementById(`pixel${segment.row}-${segment.col}`);
            pixel.classList.add("snakeBodyPixel");
        });
    }

    function drawFood() {
        const pixel = document.getElementById(`pixel${food.row}-${food.col}`);
        pixel.classList.add("food");
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function moveSnake() {
        const head = { ...snake[0] };

        if (direction === "right") head.col++;
        if (direction === "left") head.col--;
        if (direction === "up") head.row--;
        if (direction === "down") head.row++;

        snake.unshift(head);

        const ateFood = head.row === food.row && head.col === food.col;
        if (ateFood) {
            score++;
            updateScore();
            generateFood();
        } else {
            snake.pop();
        }

        drawSnake();

        if (checkCollision(head) || head.row < 0 || head.col < 0 || head.row >= gridSize || head.col >= gridSize) {
            alert("Game over!");
            location.reload(); // Restart the game
        }
    }

    function checkCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.row === snake[i].row && head.col === snake[i].col) {
                return true;
            }
        }
        return false;
    }

    function generateFood() {
        food = { row: Math.floor(Math.random() * gridSize), col: Math.floor(Math.random() * gridSize) };
        const pixel = document.getElementById(`pixel${food.row}-${food.col}`);
        if (pixel.classList.contains("snakeBodyPixel")) {
            generateFood();
        }
        drawFood();
    }

    createGrid();
    drawSnake();
    drawFood();
    updateScore();

    // Start the game loop
    setInterval(() => {
        moveSnake();
    }, 100);

    // Handle keyboard input to change direction
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && direction !== "down") direction = "up";
        if (event.key === "ArrowDown" && direction !== "up") direction = "down";
        if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
        if (event.key === "ArrowRight" && direction !== "left") direction = "right";
    });
});
