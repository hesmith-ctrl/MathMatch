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

  player1Equation = generateComplexEquation();
  player2Equation = generateComplexEquation();

  displayEquations();
  drawNumbers();
}

function generateComplexEquation() {
  let operators = ['+', '-', '×', '÷'];
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  // Generate more complex equations with multiple terms
  let leftSide = [getRandomTerm(), randomOperator, getRandomTerm(), randomOperator, "x"];
  let rightSide = [getRandomTerm(), randomOperator, getRandomTerm()];

  return {
    left: leftSide,
    right: rightSide
  };
}

function getRandomTerm() {
  return Math.floor(Math.random() * 10 + 1);
}

function displayEquations() {
  document.getElementById("p1Equation").innerText = formatEquation(player1Equation);
  document.getElementById("p2Equation").innerText = formatEquation(player2Equation);
}

function formatEquation(equation) {
  // Remove explicit multiplication symbol and simplify expressions
  let formattedLeft = equation.left.join(" ");
  formattedLeft = formattedLeft.replace("x *", "x");
  formattedLeft = simplifyExpression(formattedLeft);

  let formattedRight = equation.right.join(" ");
  formattedRight = formattedRight.replace("x *", "x");
  formattedRight = simplifyExpression(formattedRight);

  return formattedLeft + " = " + formattedRight;
}

function simplifyExpression(expression) {
  // Implement basic simplification rules (e.g., combining like terms)
  // You can add more complex simplification rules as needed
  // For now, a simple approach can be to use a library like SymPy or to implement basic rules manually.

  // Example of a simple simplification:
  // ... (implementation of simplification rules)

  return expression;
}

function drawNumbers() {
  player1Drawn = Math.floor(Math.random() * 10 + 1);
  player2Drawn = Math.floor(Math.random() * 10 + 1);
  document.getElementById("p1Drawn").innerText = player1Drawn;
  document.getElementById("p2Drawn").innerText = player2Drawn;
}

// ... rest of the code remains the same ...

// Updated evaluateOperation function to handle more complex expressions
function evaluateOperation(term, operation, number) {
  // ... (previous implementation)
  // ... (additional logic for handling more complex expressions)

  // For example, to handle expressions like "2x + 3 + 4x":
  // You can parse the expression, identify terms, and apply the operation accordingly.
  // This requires more advanced parsing and evaluation techniques.
}
