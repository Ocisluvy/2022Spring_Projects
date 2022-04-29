var list = []

function drawBoard() {
    let i;
    var w = 50;
    rect(100, 100, 50, 50)
    if ((mouseX >= 725) && (mouseX <= 975) && (mouseY >= 500) && (mouseY <= 750)) {
        if (((mouseX <= 825) || (mouseX >= 875)) || ((mouseY <= 600) || (mouseY >= 650))) {
            x1 = Math.floor((mouseX - 725) / 50);
            y1 = Math.floor((mouseY - 500) / 50);
            rect(x1 * 50, y1 * 50, 50, 50);
        }
    }

    for (i = 0; i <= BOARD_SIZE; i++) {
        line(i * w, 0, i * w, BOARD_SIZE * w);
        line(0, i * w, BOARD_SIZE * w, i * w);
    }

    fill(color('grey'));
    for (i = 0; i < list.length; i++) {
        listi = list[i]
        rect(listi[0] * 50, listi[1] * 50, 50, 50);
    }
}

// [Math.floor((mouseX - 725) / 50),Math.floor((mouseY - 500) / 50)]
function mousePressed() {
    if ((mouseX >= 725) && (mouseX <= 975) && (mouseY >= 500) && (mouseY <= 750)) {
        var test = list.indexOf([Math.floor((mouseX - 725) / 50), Math.floor((mouseY - 500) / 50)])
        if (test === -1) {
            list.push([Math.floor((mouseX - 725) / 50), Math.floor((mouseY - 500) / 50)])
        }
    }
    setList()
}

function setList() {
    listPos = []
    for (i = 0; i < list.length; i++) {
        var x1 = list[i][0] - 2;
        var y1 = 2 - list[i][1];
        listPos.push(pos(x1,y1))
    }
    setCustomer1(listPos)
}