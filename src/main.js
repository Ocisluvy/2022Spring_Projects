
var boardStack, moveStack, debugStack, undoIndex, game_ended, result;
var hoverCard, hoverCell, selectedCard, selectedOriginCell; 

var searchTimeSlider, aiBlueCheckbox, aiRedCheckbox, showHintsCheckbox, debug, cardSelects, rendered;

function setup() {
	createCanvas(1000,1000).parent("container");
		
	hoverCard = null;
	hoverCell = null;
	selectedCard = null;
	selectedOriginCell = null;
	
	debug = false;
	
	restart();
	
	searchTimeSlider = createSlider(0, 80, 22.5, 40).parent("container");
	searchTimeSlider.position(25, 450);
	searchTimeSlider.style('width', '200px');
	
	aiRedCheckbox = createCheckbox('use AI for red player', false).parent("container");
	aiBlueCheckbox = createCheckbox('use random choice for blue player', false).parent("container");
	aiRedCheckbox.position(25, 485);
	aiBlueCheckbox.position(25, 510);
	
	showHintsCheckbox = createCheckbox('show (H)ints', true).parent("container");
	showHintsCheckbox.position(25, 550);
	
	createDiv("Use Arrow Keys to browse history").position(25,575).parent("container");
	var buttons = createDiv("").position(25,600).parent("container");
	buttons.child(createButton('AI (M)ove').mousePressed(aiMove).parent("container"));
	// buttons.child(createButton('(R)estart with random cards').mousePressed(restart).parent("container"));
	buttons.child(createButton('Restart with selected cards').mousePressed(restartSelected).parent("container"));


	cardSelect()

}

function cardSelect()
{
	cardSelects = [];
	for(var i = 0; i < 5; i++)
	{
		cardSelects.push(createCardSelect().position(100,645 + i*25).selected(i));
	}
}

function createCardSelect() {
	var select = createSelect().parent("container");
	for(var i = 0; i < CARDS.length; i++)
		select.option(cardName(CARDS[i]),i);
	return select;	
}


function restart() {
	// cardSelect()
	boardStack = [];
	moveStack = [];
	debugStack = [];
	undoIndex = 0;
	game_ended = false;
	rendered = false;
	result = null;	
	
	var board = new Board().init();
	board.active = RED;
	board.generateValidMoves();
	boardStack.push(board);
}

function restartSelected() {
	restart();

	var board = currentBoard(), i = 0;


	var cardList = setCard();

	board.cards_R[0] = cardList[cardSelects[i++].selected()];
	board.cards_R[1] = cardList[cardSelects[i++].selected()];
	board.board_card = cardList[cardSelects[i++].selected()];
	board.cards_B[0] = cardList[cardSelects[i++].selected()];
	board.cards_B[1] = cardList[cardSelects[i++].selected()];
	
	board.validmoves = null;	
	board.op_validmoves = null;
	board.generateValidMoves();
}

/*
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}*/


function mouseMoved() {
	// Card Hover
	if (between2d(mouseX,mouseY, 25+70,0, 25+70+50,60)) {
		hoverCard = {player:BLUE, card: 0}
	} else 
	if (between2d(mouseX,mouseY, 25+70,0, 25+70+60+50,60)) {
		hoverCard = {player:BLUE, card: 1}
	} else
	if (between2d(mouseX,mouseY, 25+70,75+50*5+10, 25+70+50,75+50*5+10+60)) {
		hoverCard = {player:RED, card: 0}
	} else 
	if (between2d(mouseX,mouseY, 25+70,75+50*5+10, 25+70+60+50,75+50*5+10+60)) {
		hoverCard = {player:RED, card: 1}
	} else
		hoverCard = null;

	// Cell Hover
	if (between2d(mouseX,mouseY, 25,75,  25+50*5-1, 75+50*5-1)) {
		hoverCell = pos(Math.floor((mouseX - 25)/50), Math.floor((mouseY - 75)/50));
	} else 
		hoverCell = null;
}

function mouseClicked() {
	var board = currentBoard();
	
	// Select Card
	if (hoverCard && board.active === hoverCard.player) {
		selectedCard = hoverCard;
		selectedOriginCell = null;
	// Select Origin Cell
	} else if (hoverCell && selectedCard 
		&& selectedCard.player === board.active
		&& COLOR[board.get(hoverCell.x,hoverCell.y)] === board.active) {
		selectedOriginCell = hoverCell;	
	} else if (hoverCell && selectedCard && selectedOriginCell
		&& COLOR[board.get(hoverCell.x,hoverCell.y)] !== board.active) {
		
		// TODO check if valid move
		
		makeMove(new Move(selectedCard.card, selectedOriginCell, hoverCell));
		
		selectedCard = null;
		selectedOriginCell = null;
	} else {
		selectedCard = null;
		selectedOriginCell = null;
	}
	
	rendered = false;
}

function currentBoard() { return boardStack[boardStack.length-1-undoIndex]}

function makeMove(move) {
	if (currentBoard().ended() || !move)
	{
		return;
	}
	
	for(;undoIndex > 0;undoIndex--) {
		boardStack.pop();
		moveStack.pop();	
		debugStack.pop();
	}
	
	var prev_board = currentBoard();
	var new_board = new Board().copy(prev_board).makeMove(move);
	new_board.generateValidMoves();
	boardStack.push(new_board);
	debugStack.push(move.debug || "");
	moveStack.push({
		text:
			(2*prev_board.fullmove+(prev_board.active?1:0)) + " " +
			CARD_NAMES[JSON.stringify(prev_board.getActiveCard(move.card))] + " - " +
			"("+move.from.x+", "+move.from.y+") -> " +
			"("+move.to.x+", "+move.to.y+")",
		color: prev_board.active ? "#FF0000" : "#0000FF"
	});
	if (new_board.ended()) {
		if (new_board.value === 0) result = {text: "DRAW", color: "#808080"};
		else result = {text: "WIN", color: prev_board.active ? "#FF0000" : "#0000FF"};
	} else
		result = null;
	
	game_ended = new_board.ended();
}

// function aiMove() {makeMove(IDNegamax(currentBoard(), getSearchTime()).max_move);}

function aiMove() {makeMove(miniMaxRoot(currentBoard(), (searchTimeSlider.value()/40)+1));}

function keyPressed() {
	if (keyIsDown(SHIFT)) {console.log(keyCode); return;}
	rendered = false;
	switch(keyCode) {
		case 77: aiMove(); break; //M
		case 72: showHintsCheckbox.checked(!showHintsCheckbox.checked()); break; // H
		case 66: 
			var v = aiBlueCheckbox.checked() && aiRedCheckbox.checked()
			aiBlueCheckbox.checked(!v);
			aiRedCheckbox.checked(!v);
			break; // B
		case 68: debug = !debug; break; // D
		case 82: restart(); break;
		case LEFT_ARROW:
		case BACKSPACE:
			undoIndex = constrain(undoIndex+1, 0,boardStack.length-1); 
			break;
		case RIGHT_ARROW:
			undoIndex = constrain(undoIndex-1, 0,boardStack.length-1); 
			break;
		default: rendered = true; break;
	}
}

function draw() {
	var board = currentBoard();
	
	// Render
	renderBoard(board);
	
	// Time Slider
	textAlign(LEFT,CENTER); fill(0);
	stroke(0); strokeWeight(1); text("Difficulty",0,435);
	noStroke(); strokeWeight(0); 
	// var t = getSearchTime();
	var t = (searchTimeSlider.value()/40)+1
	// if (t < 1000) text(t + " ms",205,462);
	// else if (t < 60 * 1000) text(Math.floor(t / 1000*100)/100 + " s",205,462);
	// else text(Math.floor(t / (60*1000)*100)/100 + " min",205,462);
	text(t,205,462)
	
	// Selects
	textAlign(LEFT,TOP);
	stroke(0); strokeWeight(1); var s = 647, i = 0;
	stroke(255,0,0); fill(255,0,0);
	text("Red card 1",0,s+25*(i++));
	text("Red card 2",0,s+25*(i++));
	stroke(0); fill(0);
	text("Board card",0,s+25*(i++));
	stroke(0,0,255); fill(0,0,255);
	// text(mouseX, 400, 500)
	// text(mouseY, 400, 550)
	text("Blue card 1",0,s+25*(i++));
	text("Blue card 2",0,s+25*(i++));

	//Custom Boar
	textAlign(LEFT,TOP);
	stroke(0); strokeWeight(1);
	stroke(0,0,0); fill(0,0,0);
	text("Custom Board",700,470);
	translate(700,500)
	drawBoard()

	// Ai moves
	if (!game_ended && rendered && ((board.active && aiRedCheckbox.checked()) || (!board.active && aiBlueCheckbox.checked()))) aiMove();	
	
	rendered = true;
}

