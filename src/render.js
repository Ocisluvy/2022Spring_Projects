function renderBoard(board) {
	background(255);
	translate(25,0);
	
	push();
	
	// Debug Text
	if (debug) {
		textAlign(CENTER,TOP); noStroke(); strokeWeight(0); fill(0);
		text(board.value,300,10);
		text(board.validmoves.length + " - " + board.op_validmoves.length,300,30);
		text(undoIndex,300,50);
	}
	// Move list
	textAlign(LEFT,TOP); noStroke(); strokeWeight(0); fill(0);
	var is = Math.max(0,moveStack.length-25);
	for(var i = is; i < moveStack.length; i++) {
		var u = (i > moveStack.length-1-undoIndex);
		if (u) fill(192,192,192); else fill(moveStack[i].color);
		
		text(moveStack[i].text,350,10+20*(i-is));
		
		if (!u && debug) {
		fill(0);
		text(debugStack[i],525,10+20*(i-is));
		}	
		
	}
	if (result) {
		if (undoIndex !== 0) fill(192,192,192);
		else fill(result.color);
		
		text(result.text,350,10+20*(moveStack.length-is));
	}
	
	// Blue Side
	push();
		translate(70,0);
		drawCard(board.cards_B[0]);
		translate(60,0);
		drawCard(board.cards_B[1]);		
	pop();
	if (selectedCard && selectedCard.player === BLUE && !game_ended) {
		stroke(0,128,0); strokeWeight(4); noFill();
		rect(70+60*selectedCard.card,0,50,70);
	}
	if (hoverCard && hoverCard.player === BLUE && !game_ended) {
		stroke(0,255,0); strokeWeight(4); noFill();
		rect(70+60*hoverCard.card,0,50,70);
	}
	
	translate(0,75);
	
	push();
		if (showHintsCheckbox.checked() && (!game_ended || undoIndex > 0)) {
			// Valid Moves
			for(var i = 0; i < board.validmoves.length; i++) {
				var move = board.validmoves[i];
				if (hoverCell && board.get(hoverCell.x,hoverCell.y) !== E && !(move.from.x === hoverCell.x && move.from.y === hoverCell.y)) continue;
				if (selectedCard && selectedCard.card !== move.card) continue;
				
				stroke(0,255,0); strokeWeight(3); fill(0);
				arrow((move.from.x+0.5)*50,(move.from.y+0.5)*50,(move.to.x+0.5)*50,(move.to.y+0.5)*50);
			}
			for(var i = 0; i < board.op_validmoves.length; i++) {
				var move = board.op_validmoves[i];
				if (hoverCell && board.get(hoverCell.x,hoverCell.y) !== E && !(move.from.x === hoverCell.x && move.from.y === hoverCell.y)) continue;
				if (selectedCard) continue;
				
				stroke(255,0,0); strokeWeight(3); fill(0);
				arrow((move.from.x+0.5)*50,(move.from.y+0.5)*50,(move.to.x+0.5)*50,(move.to.y+0.5)*50);
			}
		}
			
		// Board
		board.draw();
		
		
		// Hover & Selected Cell
		if (selectedOriginCell && !game_ended) {
			stroke(0,128,0); strokeWeight(4); noFill();
			rect(50*selectedOriginCell.x,50*selectedOriginCell.y,50,50);
		}
		if (hoverCell && !game_ended) {
			stroke(0,255,0); strokeWeight(4); noFill();
			rect(50*hoverCell.x,50*hoverCell.y,50,50);
		}
		
		// Turn
		translate(50*5+10,50*0.25);
		stroke(0); strokeWeight(1); fill(0);
		textAlign(CENTER,TOP); text("Turn",25,0);
		fill(board.active === RED ? "#FF0000" : "#0000FF");
		ellipse(25,35,30,30);
		
		// Board Card
		translate(0,50*1.6);
		drawCard(board.board_card);
		
		// Half Move
		translate(0,50*2);
		stroke(0); strokeWeight(1); fill(0);
		textAlign(CENTER,TOP); text("Halfmove",25,0);
		translate(0,20);
		text(board.halfmove,25,0);
	pop();
	
	translate(0,50*5+10);
	
	// Red Side
	push();
		translate(70,0);
		drawCard(board.cards_R[0]);
		translate(60,0);
		drawCard(board.cards_R[1]);
	pop();
	if (selectedCard && selectedCard.player === RED && !game_ended) {
		stroke(0,128,0); strokeWeight(4); noFill();
		rect(70+60*selectedCard.card,0,50,70);
	}
	if (hoverCard && hoverCard.player === RED && !game_ended) {
		stroke(0,255,0); strokeWeight(4); noFill();
		rect(70+60*hoverCard.card,0,50,70);
	}
	
	/*
	for(var i = 0; i < 4; i++)
	for(var j = 0; j < 4; j++) {
		push();
			translate(60*j,75*i);
			drawCard(CARDS[j+4*i]);
		pop();		
	}*/
	
	pop();
}