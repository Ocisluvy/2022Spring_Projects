
var Tiger = [pos(0,2),pos(0,-1)];
var Dragon = [pos(-2,1),pos(2,1),pos(-1,-1),pos(1,-1)];
var Frog = [pos(-2,0),pos(-1,1),pos(1,-1)];
var Rabbit = [pos(2,0),pos(1,1),pos(-1,-1)];
var Crab = [pos(-2,0),pos(0,1),pos(2,0)];
var Customer1 = [pos(1,0)];
// var Customer2 = [pos(0,0)];
// var Customer3 = [pos(0,0)];
// var Customer4 = [pos(0,0)];
// var Customer5 = [pos(0,0)];

var CARDS = [Tiger,Dragon,Frog,Rabbit,Crab,Customer1
	// ,Customer2,Customer3,Customer4,Customer5
];

var CARD_NAMES = {};
CARD_NAMES[JSON.stringify(Tiger)] = "Tiger";
CARD_NAMES[JSON.stringify(Dragon)] = "Dragon";
CARD_NAMES[JSON.stringify(Frog)] = "Frog";
CARD_NAMES[JSON.stringify(Rabbit)] = "Rabbit";
CARD_NAMES[JSON.stringify(Crab)] = "Crab";
CARD_NAMES[JSON.stringify(Customer1)] = "Customer1";
// CARD_NAMES[JSON.stringify(Customer2)] = "Customer2";
// CARD_NAMES[JSON.stringify(Customer3)] = "Customer3";
// CARD_NAMES[JSON.stringify(Customer4)] = "Customer4";
// CARD_NAMES[JSON.stringify(Customer5)] = "Customer5";

function cardName(card) { return CARD_NAMES[JSON.stringify(card)]; }

var drawCard = function(card) {
	push();
	var w = 10;
	stroke(0); strokeWeight(1);
	
	// Name
	fill(0); textAlign(CENTER,TOP);
	text(CARD_NAMES[JSON.stringify(card)],25,0);
	
	translate(0,15);
	// Lines
	for(var i = 0; i <= BOARD_SIZE; i++) {
		line(i*w,0,i*w,BOARD_SIZE*w);
		line(0,i*w,BOARD_SIZE*w,i*w);
	}
	// Pieces
	fill(128); rect(2*w,2*w,w,w);
	fill(0);
	for(var i = 0; i < card.length; i++)
		rect((card[i].x+2)*w,(4-(card[i].y+2))*w,w,w);
	
	pop();
}

function setCustomer1(list) {
	Customer1 = list;
}

function setCard(){
	return [Tiger,Dragon,Frog,Rabbit,Crab,Customer1
		// ,Customer2,Customer3,Customer4,Customer5
	];
}