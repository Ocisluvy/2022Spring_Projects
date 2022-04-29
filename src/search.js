var INF = 100000;
var search_time = 1000;
var search_start = 0;
var search_accum = 0;
var timedout = false;
var cut = false;

function miniMaxRoot(board, depth) {
    if (board.active) {
        const t0 = performance.now();
        var arrayBest = []
        var maxDepth = depth * 2
        var new_value = 0;
        var bestMove;
        var moves = board.getValidMoves(board.active);
        for (var i = 0; i < moves.length; i++) {
            // search_count++;
            var new_board = new Board().copy(board).makeMove(moves[i]);
            if (Math.abs(new_board.value) > 15) {
                return moves[i];
            }
            var miniMaxValue = miniMax(new_board, maxDepth - 1);

            if (miniMaxValue > new_value) {
                new_value = miniMaxValue;
                bestMove = moves[i];
                arrayBest.splice(0, arrayBest.length);
                arrayBest.push(moves[i]);
            } else if (new_value === miniMaxValue) {
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

        const t1 = performance.now();
        console.log(`Call to Minimax took ${t1 - t0} milliseconds.`);
        return (arrayBest.length > 0) ? arrayBest[Math.floor(Math.random() * arrayBest.length)] : bestMove;
    } else {
        return randomMove(board);
    }
}
function randomMove(board) {
    var moves = board.getValidMoves(board.active);
    var randomNum = Math.floor(Math.random() * moves.length)
    return moves[randomNum]
}

function miniMax(board, depth) {
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
