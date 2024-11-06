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

function generateEquation() {
  let left = [getRandomTerm(), getRandomTerm(), "x"];
  let right = [getRandomTerm(), getRandomTerm()];

  return left.join(" ") + " = " + right.join(" ");
}

function getRandomTerm() {
  return Math.floor(Math.random() * 10) + 1;
}

function drawNumbers() {
  player1Drawn = Math.floor(Math.random() * 10) + 1;
  player2Drawn = Math.floor(Math.random() * 10) + 1;

  document.getElementById("p1Drawn").innerText = player1Drawn;
  document.getElementById("p2Drawn").innerText = player2Drawn;
}

function displayEquations() {
  document.getElementById("p1Equation").innerText = player1Equation;
  document.getElementById("p2Equation").innerText = player2Equation;
}

function applyOperation(player) {
  const playerEquation = player === "player1" ? player1Equation : player2Equation;
  const operation = player === "player1" ? document.getElementById("player1Operation").value : document.getElementById("player2Operation").value;

  const result = evaluateEquation(playerEquation, operation);

  document.getElementById("result").innerText = `${player === "player1" ? player1Name : player2Name}'s Result: ${result}`;
}

function evaluateEquation(equation, operation) {
  // Basic evaluator logic based on the current equation format
  // This is a simplified version to evaluate equations
  let leftSide = equation.split(" = ")[0];
  let rightSide = equation.split(" = ")[1];

  leftSide = leftSide.replace("x", leftSide.split("x")[0] + " " + operation + " " + leftSide.split("x")[1]);
  rightSide = rightSide.split(" ").map(Number).reduce((a, b) => a + b);
  
  return eval(leftSide);  // Simplified logic for evaluating left side
}

function nextTurn() {
  player1Equation = generateEquation();
  player2Equation = generateEquation();

  displayEquations();
  drawNumbers();
  document.getElementById("result").innerText = "";
}
