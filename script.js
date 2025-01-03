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

  return { left: left.sort(() => Math.random() - 0.5), right: right.sort(() => Math.random() - 0.5) };
}

function getRandomTerm() {
  return Math.floor(Math.random() * 10 + 1);
}

function displayEquations() {
  document.getElementById("p1Equation").innerText = formatEquation(player1Equation);
  document.getElementById("p2Equation").innerText = formatEquation(player2Equation);
}

function formatEquation(equation) {
  return equation.left.join(" + ") + " = " + equation.right.join(" + ");
}

function drawNumbers() {
  player1Drawn = Math.floor(Math.random() * 10 + 1);
  player2Drawn = Math.floor(Math.random() * 10 + 1);

  document.getElementById("p1Drawn").innerText = player1Drawn;
  document.getElementById("p2Drawn").innerText = player2Drawn;
}

function applyOperation(player) {
  const operation = document.getElementById(player + "Operation").value;
  const drawnNumber = player === "player1" ? player1Drawn : player2Drawn;
  const equation = player === "player1" ? player1Equation : player2Equation;

  equation.left = equation.left.map(term => evaluateOperation(term, operation, drawnNumber));
  equation.right = equation.right.map(term => evaluateOperation(term, operation, drawnNumber));

  equation.left = simplifyEquationSide(equation.left);
  equation.right = simplifyEquationSide(equation.right);

  document.getElementById(player + "ApplyBtn").classList.remove("applied");
  document.getElementById(player + "ApplyBtn").classList.add("applied");

  displayEquations();
  checkSolution();
}

function evaluateOperation(term, operation, number) {
  if (typeof term === "number") {
    switch (operation) {
      case "+": return term + number;
      case "-": return term - number;
      case "×": return term * number; // Using × for multiplication
      case "÷": return Math.floor(term / number); // Using ÷ for division
    }
  }
  return term;
}

function simplifyEquationSide(side) {
  const terms = side.filter(term => term !== "x");
  const xTerm = side.includes("x") ? ["x"] : [];
  const totalSum = terms.reduce((sum, term) => sum + term, 0);
  return totalSum ? [totalSum, ...xTerm] : xTerm;
}

function checkSolution() {
  const p1Solved = player1Equation.left.length === 1 && player1Equation.left.includes("x");
  const p2Solved = player2Equation.left.length === 1 && player2Equation.left.includes("x");

  if (p1Solved && p2Solved) {
    document.getElementById("result").innerText = "It's a tie!";
  } else if (p1Solved) {
    document.getElementById("result").innerText = `${player1Name} wins!`;
    window.location.href = "https://www.youtube.com/watch?v=RS0KrRG_q3I&t=13s"; // Redirects on Player 1 win
  } else if (p2Solved) {
    document.getElementById("result").innerText = `${player2Name} wins!`;
    window.location.href = "https://www.youtube.com/watch?v=RS0KrRG_q3I&t=13s"; // Redirects on Player 2 win
  }
}

function nextTurn() {
  drawNumbers();
  document.getElementById("player1ApplyBtn").classList.remove("applied");
  document.getElementById("player2ApplyBtn").classList.remove("applied");
  displayEquations();
}
