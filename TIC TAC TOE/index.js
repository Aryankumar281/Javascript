const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".current-player");
const newGameBtn = document.querySelector(".new-game-btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.innerText = ""; 
        boxes[index].style.pointerEvents = "all";
        //one more missing thing
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove(".active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //ui update kro
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
   let answer = "";
    winningPosition.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1 ]] === gameGrid[position[2]])){


            //check if winner is X or O
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }
            ///disble pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"; 
            })

            //mark green to winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++ ;
    });

    if(fillCount == 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //turn
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();

    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",() => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);