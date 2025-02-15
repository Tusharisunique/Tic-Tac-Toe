const game = document.getElementById('game');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const currentPlayerDisplay = document.getElementById('currentPlayer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = false;

let playerXName = '';
let playerOName = '';

const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

window.onload = function() {
   playerXName = prompt("Enter Player X Name:", "Player X") || "Player X";
   playerOName = prompt("Enter Player O Name:", "Player O") || "Player O";
   startGame();
};

function createGrid() {
   board.forEach((cellValue, index) => {
       const cell = document.createElement('div');
       cell.classList.add('cell');
       cell.setAttribute('data-cell-index', index);
       cell.innerText = cellValue;

       cell.addEventListener('click', handleCellClick);
       game.appendChild(cell);
   });
}

function handleCellClick(event) {
   const clickedCell = event.target;
   const clickedCellIndex = clickedCell.getAttribute('data-cell-index');

   if (board[clickedCellIndex] !== '' || !isGameActive) {
       return;
   }

   board[clickedCellIndex] = currentPlayer;

   clickedCell.innerText = currentPlayer;
   clickedCell.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');

   checkResult();
}

function checkResult() {
   let roundWon = false;

   for (let i = 0; i < winningConditions.length; i++) {
       const [a, b, c] = winningConditions[i];
       if (board[a] === '' || board[b] === '' || board[c] === '') {
           continue;
       }
       if (board[a] === board[b] && board[a] === board[c]) {
           roundWon = true;
           break;
       }
   }

   if (roundWon) {
       const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
       announceWinner(winnerName);
       isGameActive = false;
       return;
   }

   if (!board.includes('')) {
       statusDisplay.innerText = 'Draw!';
       isGameActive = false;
       return;
   }

   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   currentPlayerDisplay.innerText = `Current Player: ${currentPlayer === 'X' ? playerXName : playerOName}`;
}

function announceWinner(winnerName) {
   const overlay = document.createElement('div');
   overlay.classList.add('overlay');
   document.body.appendChild(overlay);
   
   const winnerAnnouncement = document.createElement('div');
   winnerAnnouncement.classList.add('winner-announcement');
   winnerAnnouncement.innerText = `${winnerName} has won!`;
   
   document.body.appendChild(winnerAnnouncement);
   
   // Add active class after a small delay to trigger animation
   setTimeout(() => {
       overlay.classList.add('active');
   }, 10);

   setTimeout(() => {
       winnerAnnouncement.remove();
       overlay.remove();
   }, 3000);
}

function restartGame() {
   isGameActive = true;
   currentPlayer = 'X';
   board.fill('');
   
   statusDisplay.innerText = '';
   
   game.innerHTML = '';
   createGrid();

   currentPlayerDisplay.innerText = `Current Player: ${playerXName}`;
}

function startGame() {
   isGameActive = true; 
   
   currentPlayerDisplay.innerText = `Current Player: ${playerXName}`;
   
   game.innerHTML = '';
   createGrid();
}

restartButton.addEventListener('click', restartGame);
