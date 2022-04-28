var INF = 100000;
var search_time = 1000;
var search_start = 0;
var search_accum = 0;
var search_count = 0;
var timedout = false;
var cut = false;

function checkTime() {
	if(search_accum++ > 10000) {
		if (new Date().getTime() - search_start > search_time) timedout = true;
		search_accum = 0;
	}
	return timedout;
}

function miniMaxRoot(board,depth)
{
	var arrayBest = []
	var maxDepth = depth * 2
	var new_value = 0;
	var bestMove;
	var moves = board.getValidMoves(board.active);
	for(var i = 0; i < moves.length; i++) {
		// search_count++;
		var new_board = new Board().copy(board).makeMove(moves[i]);
		if (Math.abs(new_board.value) > 15)
		{
			return moves[i];
		}
		var miniMaxValue = miniMax(new_board, maxDepth - 1);

		if (miniMaxValue>new_value){
			new_value = miniMaxValue;
			bestMove  = moves[i];
			arrayBest.splice(0,arrayBest.length);
			arrayBest.push(moves[i]);
		}
		else if (new_value === miniMaxValue){
			arrayBest.push(moves[i]);
		}

		// }
		// else{
		// 	new_value = Math.min(miniMaxValue, new_value);
		// }

	}
	// var testNum = Math.floor(Math.random() * arrayBest.length)
	// var test2 = arrayBest[0]
	// var test = (arrayBest.length > 0) ? arrayBest[Math.floor(Math.random() * arrayBest.length)] : bestMove;
	return (arrayBest.length > 0) ? arrayBest[Math.floor(Math.random() * arrayBest.length)] : bestMove;
	// return test
}

function miniMax(board,depth) {
	// if (checkTime()) return null;
	if (board.ended()) return board.value;
	// console.log(depth);
	if (depth === 0) {
		cut = true;
		return board.value;
	}
	var moves = board.getValidMoves(board.active);
	var new_value = null;
	for (var i = 0; i < moves.length; i++) {
		// search_count++;
		var new_board = new Board().copy(board).makeMove(moves[i]);
		var miniMaxValue = miniMax(new_board, depth - 1);
		if (new_value === null) {
			new_value = miniMaxValue;
		} else {
			if ((depth % 2) === 0) {
				new_value = Math.max(miniMaxValue, new_value);
			} else {
				new_value = Math.min(miniMaxValue, new_value);
			}

		}
		return new_value;
	}
}
