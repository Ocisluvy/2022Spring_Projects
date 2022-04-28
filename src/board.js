

var Board = function () {
	this.cells = [];
	this.active = RED;

	this.cards = null;
	this.cards_R = [];
	this.cards_B = [];
	this.board_card = null;

	this.validmoves = null;
	this.op_validmoves = null;

	this.halfmove = 0;
	this.fullmove = 0;

	this.value = 0;
}

Board.prototype.init = function() {
	for(var i = 0; i < BOARD_SIZE*BOARD_SIZE; i++)
		this.cells[i] = E;
	
	this.set(0,0,B_P);
	this.set(1,0,B_P);
	this.set(2,0,B_K);
	this.set(3,0,B_P);
	this.set(4,0,B_P);
	
	this.set(0,4,R_P);
	this.set(1,4,R_P);
	this.set(2,4,R_K);
	this.set(3,4,R_P);
	this.set(4,4,R_P);
	
	this.active = true;
	this.halfmove = 0;
	this.fullmove = 0;
	
	this.value = this.evaluate();

	// this.cards = getRandom(CARDS,5);
	// this.cards_R.push(this.cards[0]);
	// this.cards_R.push(this.cards[1]);
	// this.cards_B.push(this.cards[2]);
	// this.cards_B.push(this.cards[3]);
	// this.board_card = this.cards[4];

	this.cards_R.push(CARDS[0]);
	this.cards_R.push(CARDS[1]);
	this.cards_B.push(CARDS[3]);
	this.cards_B.push(CARDS[4]);
	this.board_card = CARDS[2];
	
	return this;
}

Board.prototype.set = function(x,y,p) { if(x >= 0 && x < BOARD_SIZE && y>=0 && y < BOARD_SIZE) this.cells[y*BOARD_SIZE + x] = p;}
Board.prototype.get = function(x,y) { if(x >= 0 && x < BOARD_SIZE && y>=0 && y < BOARD_SIZE) return this.cells[y*BOARD_SIZE + x]; else return null;}
Board.prototype.getActiveCard = function(i) {
	if (i !== 0 && i !== 1) return null;
	return this.active ? this.cards_R[i] : this.cards_B[i];
}

Board.prototype.copy = function(board) {
	for(var i = 0; i < BOARD_SIZE*BOARD_SIZE; i++) {
		this.cells[i] = board.cells[i];
	}
	this.active = board.active;
	this.halfmove = board.halfmove;
	this.fullmove = board.fullmove;
	this.value = board.value;
	
	this.cards_R[0] = board.cards_R[0];
	this.cards_R[1] = board.cards_R[1];
	
	this.cards_B[0] = board.cards_B[0];
	this.cards_B[1] = board.cards_B[1];
	
	this.board_card = board.board_card;
	
	this.validmoves = board.validmoves;
	this.op_validmoves = board.op_validmoves;
	
	return this;
}

var PIECE_TYPES = [B_P,B_K,R_P,R_K];

function fn(arr, num) {
	let newArr = []
	const total = Math.ceil(arr.length / num)
	for (let i = 0; i < total; i++) {
		var a = arr.slice(i * num, (i + 1) * num)
		newArr.push(a)
	}
	return newArr
}


Board.prototype.evaluate = function() {
	let i;
	let j;
	let rwd;
	let bwd;
	let rwd_record = true;
	var counts = {};

	for(i = 0; i < PIECE_TYPES.length; i++) counts[PIECE_TYPES[i]] = 0;

	var twoD = fn(this.cells, 5)

	// for(i = 0; i < BOARD_SIZE*BOARD_SIZE; i++) {
	// 	var p = this.cells[i];
	// 	if (p === E) continue;
	// 	counts[p] += 1;
	// }

	for(i = 0; i < BOARD_SIZE; i++)
	{
		for (j = 0; j < BOARD_SIZE; j++)
		{
			var p = twoD[i][j];
			if (p === E) continue;
			counts[p] += 1;
			if (p === 3|| p === 4)
			{
				if (rwd_record){
					rwd = i;
					rwd_record = false;
				}
			}
			if (p === 1|| p === 2)
			{
				bwd = BOARD_SIZE - 1 - i
			}
		}
	}
	var material
	if (this.active)
	{
		material = 200*(counts[R_K]-counts[B_K]) + (counts[R_P] - counts[B_P]) + (BOARD_SIZE - rwd);
		if (this.get(2,0) === R_K || this.get(2,0) === R_P) material += 200;
	}
	else
	{
		material = 200*(counts[B_K]-counts[R_K]) + (counts[B_P] - counts[R_P]) + (BOARD_SIZE - bwd);
		if (this.get(2,4) === B_K || this.get(2,4) === B_P) material += 200;
	}
	
	if (this.halfmove >= 50) {

		if (material === 0) return 0;
		else return (material > 0 ? 1 : -1)*(this.active ? 1 : -1);
	}

	return material;
}

Board.prototype.ended = function() {
	return (this.halfmove >= 50 || Math.abs(this.value) > 15);
}

Board.prototype.draw = function() {
		
	let i;
	var w = 50;
	stroke(0); strokeWeight(1);
	
	// Lines	
	for(i = 0; i <= BOARD_SIZE; i++) {
		line(i*w,0,i*w,BOARD_SIZE*w);
		line(0,i*w,BOARD_SIZE*w,i*w);
	}
	
	// Pieces
	for(i = 0; i < BOARD_SIZE; i++)
	for(var j = 0; j < BOARD_SIZE; j++) {
		switch(this.get(j,i)) {
			case B_P: fill(0,0,255); ellipse((j+0.5)*w,(i+0.5)*w,w/2,w/2); break;
			case B_K: fill(0,0,255); ellipse((j+0.5)*w,(i+0.5)*w,w/1.5,w/1.5); break;
			case R_P: fill(255,0,0); ellipse((j+0.5)*w,(i+0.5)*w,w/2,w/2); break;
			case R_K: fill(255,0,0); ellipse((j+0.5)*w,(i+0.5)*w,w/1.5,w/1.5); break;
		}
	}
}
