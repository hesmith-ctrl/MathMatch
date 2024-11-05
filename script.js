let player1Equation, player2Equation;
let player1Drawn, player2Drawn;
let player1Name, player2Name;

function startGame() {
  player1Name = document.getElementById("player1Name").value || "Player 1";
  player2Name = document.getElementById("player2Name").value || "Player 2";

  document.getElementById("player1Title").innerText = player1Name;
  document.getElementById("player2Title").innerText = player2Name;

  document.getElementById("nameEntry").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  player1Equation = generateEquation();
  player2Equation = generateEquation();

  displayEquations();
  drawNumbers();
}

// ... rest of your original `script.js` code ...

function checkSolution() {
  const p1Solved = player1Equation.left.length === 1 && player1Equation.left.includes("x");
  const p2Solved = player2Equation.left.length === 1 && player2Equation.left.includes("x");

  if (p1Solved && p2Solved) {
    document.getElementById("result").innerText = "It's a tie!";
  } else if (p1Solved) {
    document.getElementById("result").innerText = `${player1Name} wins!`;
    // Open music video in a new tab
    window.open("https://music.youtube.com/watch?v=tXEPbotEjZE", "_blank");
    // Disable "Next Turn" button
    document.getElementById("nextTurn").disabled = true;
  } else if (p2Solved) {
    document.getElementById("result").innerText = `${player2Name} wins!`;
    // Open music video in a new tab
    window.open("https://music.youtube.com/watch?v=tXEPbotEjZE", "_blank");
    // Disable "Next Turn" button
    document.getElementById("nextTurn").disabled = true;
  }
}
