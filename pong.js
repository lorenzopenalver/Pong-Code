// Pong Game JavaScript Code
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 2,
    dy: -2,
    radius: 10,
    speedIncreaseInterval: 5, // Increase the ball's speed every 5 points
};

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
};

let leftPressed = false;
let rightPressed = false;
let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 30);
}

function increaseBallSpeed() {
    if (score % ball.speedIncreaseInterval === 0 && score > 0) {
        if (ball.dx > 0) {
            ball.dx += 1;
        } else {
            ball.dx -= 1;
        }

        if (ball.dy > 0) {
            ball.dy += 1;
        } else {
            ball.dy -= 1;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            score++;
            increaseBallSpeed();
        } else {
            // Game Over
            alert('Game Over! Final Score: ' + score);
            document.location.reload();
        }
    }

    if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    } else if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    }

    requestAnimationFrame(draw);
}

draw();