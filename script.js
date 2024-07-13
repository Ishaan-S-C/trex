const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
let score = 0;
let isGameOver = false;
let cactusInterval;
let collisionCheckInterval;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        
        setTimeout(function() {
            dino.classList.remove("jump");
        }, 500); // Match the duration of the jump animation
    }
}

function updateScore() {
    if (!isGameOver) {
        score++;
        scoreElement.textContent = score;
        requestAnimationFrame(updateScore);
    }
}

function startGame() {
    score = 0;
    isGameOver = false;
    cactus.style.left = "600px";
    updateScore();
    moveCactus();
    checkCollision();
}

function checkCollision() {
    collisionCheckInterval = requestAnimationFrame(checkCollision);

    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 90 && cactusLeft > 50 && dinoTop >= 140) {
        isGameOver = true;
        alert("Game Over! Your score: " + score);
        cancelAnimationFrame(collisionCheckInterval);
        clearInterval(cactusInterval);
    }
}

function moveCactus() {
    cactusInterval = setInterval(function() {
        if (!isGameOver) {
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
            if (cactusLeft < -34) {
                cactus.style.left = "600px"; // Reset position when it moves off-screen
            } else {
                cactus.style.left = cactusLeft - 10 + "px"; // Move left by 10px
            }
        }
    }, 100);
}

function resetGame() {
    score = 0;
    scoreElement.textContent = score;
    isGameOver = false;
    cactus.style.left = "600px";
    dino.classList.remove("jump");
    clearInterval(cactusInterval);
    cancelAnimationFrame(collisionCheckInterval);
    startGame();
}

// Start the game
startGame();
