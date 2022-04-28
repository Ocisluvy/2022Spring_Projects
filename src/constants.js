var E = 0;

var RED = true;
var BLUE = false;

var B_P = 1;
var B_K = 2;

var R_P = 3;
var R_K = 4;

var BOARD_SIZE = 5;

var COLOR = {};
COLOR[B_P] = BLUE;
COLOR[B_K] = BLUE;

COLOR[R_P] = RED;
COLOR[R_K] = RED;

var PIECE_NAMES = {};
PIECE_NAMES[E] = "E";

PIECE_NAMES[B_P] = "B_P";
PIECE_NAMES[B_K] = "B_K";

PIECE_NAMES[R_P] = "R_P";
PIECE_NAMES[R_K] = "R_K";

function pos(x,y) { return {x: x, y: y};}

function between(x,a,b) {return x >= a && x <= b;}
function between2d(x,y, ax,ay, bx,by) {return x >= ax && x <= bx && y >= ay && y <= by;}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function arrow(x1,y1,x2,y2) {
	var d = dist(x1,y1,x2,y2);
	var v = pos((x2-x1)/d,(y2-y1)/d);
	var t = pos(-v.y,v.x);
	line(x1,y1,x2,y2);
	line(x2-5*t.x-10*v.x,y2-5*t.y-10*v.y,x2,y2);
	line(x2+5*t.x-10*v.x,y2+5*t.y-10*v.y,x2,y2);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function logSlider(position, va,vb) {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 100;

  // The result should be between 10 an 10000
  var minv = Math.log(va || 10);
  var maxv = Math.log(vb || 10000);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  return Math.round(Math.exp(minv + scale*(position-minp)) / 10) * 10;
  //   return
}