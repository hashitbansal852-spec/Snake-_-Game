let snake = [{
    x: 1,
    y: 1,
}];

let food = [{
    x: 9,
    y: 8,
}];

let scora = 0;
let highscora = 0;
var direction = "right";

let score = document.querySelector("#infa");
let highscore = document.querySelector("#infass");
let gameboard = document.querySelector("#gameboard");
let announcement = document.querySelector(".announce");
score.innerText = 0;

let over = () => {
    if ((snake[0].x == 0) || (snake[0].x == 23)) {
        clearInterval(id);
        snake[0].x = 1;
        snake[0].y = 1;
        announcement.classList.remove("hide");
    }
    else if ((snake[0].y == 0) || (snake[0].y == 23)) {
        clearInterval(id);
        announcement.classList.remove("hide");
        console.log("game over");
    }
    for (let i = 2; i < snake.length; i++) {
        if ((snake[0].x == snake[i].x) && (snake[0].y == snake[i].y)) {
            clearInterval(id);
            announcement.classList.remove("hide");
            console.log("game over");
        }
    }
};

let handler = () => {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    if (direction === "right") {
        snake[0].x++;
    }
    else if (direction === "left") {
        snake[0].x--;
    }
    else if (direction === "up") {
        snake[0].y--;
    }
    else if (direction === "down") {
        snake[0].y++;
    }
};

let draw = () => {
    gameboard.innerHTML = "";

    let foodDiv = document.createElement("div");
    foodDiv.classList.add("food");
    foodDiv.style.gridColumnStart = food[0].x;
    foodDiv.style.gridRowStart = food[0].y;
    gameboard.appendChild(foodDiv);

    for (let i = 0; i < snake.length; i++) {

        let snakeDiv = document.createElement("div");

        snakeDiv.classList.add("snake");

        snakeDiv.style.gridColumnStart = snake[i].x;
        snakeDiv.style.gridRowStart = snake[i].y;

        gameboard.appendChild(snakeDiv);
    }
};

let check = () => {
    if ((snake[0].x == food[0].x) && (snake[0].y == food[0].y)) {
        food[0].x = (Math.floor((Math.random()) * 22)) + 1;
        food[0].y = (Math.floor((Math.random()) * 22)) + 1;

        scora++;
        score.innerHTML = (scora);

        if (scora > highscora) {
            highscora = scora;
            highscore.innerHTML = (highscora);
        }
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    }
};
let resetGame = () => {

    snake = [{ x: 1, y: 1 }];
    food = [{ x: 9, y: 8 }];
    scora = 0;
    direction = "right";
    announcement.classList.add("hide");

    score.innerHTML = 0;

    clearInterval(id);
    id = setInterval(() => {
        handler();
        check();
        over();
        draw();
    }, 200);
};

let id = setInterval(() => {
    handler()
    check();
    over();
    draw();
}, 200);

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key == " ") {
        resetGame();
    }
    if ((event.key == "ArrowUp") && (direction != "down")) {
        direction = "up";
    }
    else if (event.key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
    else if ((event.key == "ArrowLeft") && (direction != "right")) {
        direction = "left";
    }
    else if ((event.key == "ArrowRight") && (direction != "left")) {
        direction = "right";
    }
});