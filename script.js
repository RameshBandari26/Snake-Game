
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('move.mp3');
let speed = 6;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x: 6, y: 7};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collision(snake){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine(){

    if(collision(snakeArr)){
        gameOverSound.play();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }


    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       foodSound.play();
        score += 1;
        if(score > hightScoreVal){
            hightScoreVal = score;
            localStorage.setItem("highscore", JSON.stringify(hightScoreVal));
            hightScoreBox.innerHTML = "High Score: " + hightScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score

       snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
         let a = 2,b=17;
            food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
      
    }
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    playArea.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        playArea.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playArea.appendChild(foodElement);
}

let hightScore = localStorage.getItem("highscore");
if(hightScore === null){
    hightScoreVal = 0;
    localStorage.setItem("highscore", JSON.stringify(hightScoreVal));
}else{
    hightScoreVal = JSON.parse(hightScore);
    hightScoreBox.innerHTML = "High Score: " + hightScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    if (inputDir.x === 0 && inputDir.y === 0) {
        inputDir = {x: 0, y: 1};
    }
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

document.getElementById("up").addEventListener("click", () => {
    if(inputDir.y === 0) {
        inputDir.x = 0;
        inputDir.y = -1;
    }
});
document.getElementById("down").addEventListener("click", () => {
    if(inputDir.y === 0) {
        inputDir.x = 0;
        inputDir.y = 1;
    }
});
document.getElementById("left").addEventListener("click", () => {
    if(inputDir.x === 0) {
        inputDir.x = -1;
        inputDir.y = 0;
    }
});
document.getElementById("right").addEventListener("click", () => {
    if(inputDir.x === 0) {
        inputDir.x = 1;
        inputDir.y = 0;
    }
});
document.getElementById("pass").addEventListener("click", () => {
    inputDir = { x: 0, y: 0 };
});
