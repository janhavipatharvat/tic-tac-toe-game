const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const themeToggle = document.getElementById("themeToggle");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];


document.body.classList.add("light");

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function checkWinner() {
  for (let condition of winningConditions) {
    const [a,b,c] = condition;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;

      
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      
      cells.forEach(cell => cell.style.cursor = "not-allowed");

      statusText.innerHTML = `Player <strong>${currentPlayer}</strong> Wins!`;
      return;
    }
  }

  
  if (!board.includes("")) {
    gameActive = false;
    cells.forEach(cell => cell.style.cursor = "not-allowed");
    statusText.textContent = "It's a Draw!";
  }
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = `Player <strong>${currentPlayer}</strong>'s Turn`;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
    cell.style.cursor = "pointer";
  });

  statusText.innerHTML = "Player <strong>X</strong>'s Turn";
}

function toggleTheme() {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeToggle.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    themeToggle.textContent = "Dark Mode";
  }
}


cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
  cell.style.cursor = "pointer";
});

restartBtn.addEventListener("click", restartGame);
themeToggle.addEventListener("click", toggleTheme);


statusText.innerHTML = "Player <strong>X</strong>'s Turn";