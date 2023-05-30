let move = 0;
let opponent = 0;

const winningCombinations = [
    [1,2,3], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7], [4,5,6], [7,8,9]
];
const player1 = [];
const player2 = [];
const remainingMoves = [];

const AI = document.querySelector('.robot');

AI.addEventListener('click', changeOpponent);

function createBoard (){
    let gameboard = document.querySelector('.gameboard');

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');

        div.classList.add('piece');
        div.addEventListener('mousedown', makeMove);
        div.setAttribute('div-index', i+1);
        div.setAttribute('piece', i);

        remainingMoves.push(i);

        gameboard.appendChild(div);
    };
}

window.onload = () => {
    createBoard();
}


function makeMove (e) {
    let moveTaken = this.getAttribute('div-index');
    if (moveTaken >= 1) {
        if (move === 0) {
            e.target.textContent = 'X';
            move = 1;
            player1.push(Number(moveTaken));
            remainingMoves.splice(Number(moveTaken-1), 1)
            console.log(moveTaken - 1);
            console.log(remainingMoves);
            if (checkGameWin(player1)) {
                gameOver('Player 1 Wins');
            } else if (opponent == 1) {
                computerMove();
                move = 0;
            }
        } else if (opponent == 0) {
            e.target.textContent = 'O';
            move = 0;
            player2.push(Number(moveTaken));
            if (checkGameWin(player2)) {
                gameOver('Player 2 Wins');
            }
        }
        this.setAttribute('div-index', 0)
    }
}

function checkGameWin(array) {
    for (let i = 0; i < winningCombinations.length; i++) {
      if (winningCombinations[i].every(elem => array.includes(elem))) {
        return true;
      }
    }
    return false;
};

function gameOver (message) {
    const gameMsg = document.querySelector('.gameOver');
    const restart = document.getElementById('restart');
    gameMsg.textContent = message;
    gameMsg.style.visibility = 'visible';
    restart.style.visibility = 'visible';
    restart.addEventListener('click', newGame);

    function newGame() {
        let gameboard = document.querySelector('.gameboard');
        gameboard.innerHTML = '';
        gameMsg.style.visibility = 'hidden';
        restart.style.visibility = 'hidden';
        player1.length = 0;
        player2.length = 0;
        move = 0;
        remainingMoves.length = 0;
        createBoard();
    }
}

function changeOpponent() {
    let hasgamebegun = player1.length + player2.length;
    if (hasgamebegun == 0) {
        let name = document.querySelector('.opponent')
        if (opponent === 1) {
            opponent = 0;
            name.textContent = 'Player 2';
        } else{
            opponent = 1;
            name.textContent = 'AI';
        }
    }
}

function computerMove() {
    let openMove = 0;
    while (openMove === 0) {
        let computerSpot = Math.floor(Math.random() * 9) + 1; // Generate a random number from 1 to 9
        const nthDiv = document.querySelector(`.gameboard > div:nth-child(${computerSpot})`);
        if (nthDiv && remainingMoves.includes(computerSpot - 1) && !player1.includes(computerSpot)) {
            openMove = 1;
            nthDiv.textContent = 'O'; // Make the move for the computer
            player2.push(computerSpot);
            if (checkGameWin(player2)) {
                gameOver('Player 2 Wins');
            }
            const divIndexAttr = nthDiv.getAttribute('div-index');
            if (divIndexAttr) {
                nthDiv.setAttribute('div-index', 0);
                const indexToRemove = remainingMoves.indexOf(parseInt(divIndexAttr) - 1);
                if (indexToRemove !== -1) {
                    remainingMoves.splice(indexToRemove, 1);
                }
            }
        }
    }
}