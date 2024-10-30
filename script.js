// JavaScript for the algebra game

// Define initial equations and values for each player
let players = [
    { name: "", equation: "x = 5", drawnNumber: 7 },
    { name: "", equation: "x = 2", drawnNumber: 4 }
];

let currentPlayerIndex = 0;
let targetValue = 10;

// Function to apply an operation to the current player's equation
function applyOperation(operation, playerIndex) {
    let player = players[playerIndex];
    let [lhs, rhs] = player.equation.split(" = ");
    rhs = eval(rhs + operation + player.drawnNumber); // Evaluate the operation

    // Update the equation and simplify it
    player.equation = `${lhs} = ${rhs}`;
    document.getElementById(`equation-${playerIndex}`).textContent = `Equation: ${player.equation}`;

    // Indicate operation applied by turning button green temporarily
    let button = document.getElementById(`apply-btn-${playerIndex}`);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300); // Revert color after 300ms
}

// Function to check if any player has won
function checkWinner() {
    for (let player of players) {
        let [, rhs] = player.equation.split(" = ");
        if (parseInt(rhs) === targetValue) {
            document.getElementById("winner-msg").textContent = `${player.name} wins!`;
            document.getElementById("next-turn-btn").disabled = true;
            return true;
        }
    }
    return false;
}

// Function to handle the next turn
function nextTurn() {
    // Check if someone has won before continuing
    if (checkWinner()) return;

    // Switch to the next player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    // Update display for each player's equation and drawn number
    players.forEach((player, index) => {
        document.getElementById(`equation-${index}`).textContent = `Equation: ${player.equation}`;
        document.getElementById(`drawn-number-${index}`).textContent = `Drawn Number: ${player.drawnNumber}`;
    });
}

// Start the game and initialize player names
document.getElementById("start-game-btn").addEventListener("click", function() {
    players[0].name = document.getElementById("player1-name").value || "Player 1";
    players[1].name = document.getElementById("player2-name").value || "Player 2";

    document.getElementById("player1-header").textContent = players[0].name;
    document.getElementById("player2-header").textContent = players[1].name;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
});

// Set up event listeners for apply and next turn buttons
window.onload = function() {
    players.forEach((player, index) => {
        document.getElementById(`apply-btn-${index}`).addEventListener("click", () => {
            let operation = document.getElementById(`operation-${index}`).value;
            applyOperation(operation, index);
        });
    });

    document.getElementById("next-turn-btn").addEventListener("click", nextTurn);
};
