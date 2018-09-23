// Kiet Tran
// Sep 17, 2018

// Get elements
var body = document.getElementsByTagName("BODY")[0];
var squares = document.querySelectorAll(".square");
var displayValue = document.getElementById("displayValue");
var messageDisplay = document.getElementById("messageDisplay");
var resetButton = document.getElementById("resetButton");
var difficultyButtons = document.querySelectorAll(".difficulty");
var topBar = document.querySelectorAll(".topBar")[0];

var numOfColors = 3;
var colors = [];
var winColor;
var bgColor = "#2b2b2b";

function setupButtons() {
	resetButton.addEventListener("click", setupGame);
	for (var i = 0; i < difficultyButtons.length; i++) {
		difficultyButtons[i].addEventListener("click", difficultySelected);
	}
}

function difficultySelected() {
	for (var i = 0; i < difficultyButtons.length; i++) {
		difficultyButtons[i].classList.remove("selected");
	}
	this.classList.add("selected");
	if (this.textContent === "Easy") {
		numOfColors = 3;
	}
	else if (this.textContent === "Medium") {
		numOfColors = 6;
	}
	else {
		numOfColors = 9;
	}
	setupGame();
}

function setupGame() {
	topBar.style.backgroundColor = "rgba(43, 43, 43, 0.8)";
	body.style.backgroundColor = bgColor;
	messageDisplay.textContent = "";
	messageDisplay.style.backgroundColor = bgColor;
	resetButton.textContent = "New Colors";


	// Randomize the colors array
	colors = [];

	for (var i = 0; i < numOfColors; i++) {
		var randomR = Math.floor(Math.random() * 256);
		var randomG = Math.floor(Math.random() * 256);
		var randomB = Math.floor(Math.random() * 256);

		colors[i] = "rgb(" + randomR.toString() + ", " + randomG.toString() + ", " + randomB.toString() + ")";
	}

	// Choose the winning color
	winColor = colors[Math.floor(Math.random() * numOfColors)];
	displayValue.textContent = winColor;

	// Setup the squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else { // if there is no color, don't display the square
			squares[i].style.display = "none";
		}
		
		squares[i].addEventListener("click", clickedASquare);
	}
}

function clickedASquare() {
	var clickedColor = this.style.backgroundColor;

	if (clickedColor == winColor) {
		messageDisplay.textContent = "You Got It!";
		messageDisplay.style.backgroundColor = "green";
		resetButton.textContent = "Play Again";
		body.style.backgroundColor = winColor;
		topBar.style.backgroundColor = winColor;
		for (var i = 0; i < squares.length; i++) {
			squares[i].style.backgroundColor = winColor;
		}
	}
	else {
		messageDisplay.textContent = "Guess Again";
		messageDisplay.style.backgroundColor = "red";
		this.style.backgroundColor = bgColor; // square fades into background
	}
}

function main() {
	setupButtons();
	setupGame();
}

main();