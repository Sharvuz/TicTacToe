var bool = true; // true cho X, false cho O
var count = 0;
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


function choice(button) {
    var row = button.getAttribute("row");
    var col = button.getAttribute("col");

    if (board[row][col] !== '') return;

    if (bool) {
        button.style.backgroundImage = "url('X.png')";
        board[row][col] = 'X';
    } else {
        button.style.backgroundImage = "url('O.png')";
        board[row][col] = 'O';
    }
    button.setAttribute("disabled", "true");
    
    if(bool) {
        bool = false;
    } else {
        bool = true;
    }
    count++;


    if (checkWinner()) {
        setTimeout(function() {
            var rp = bool ? 'O thắng cuộc! (OK để chơi lại)' : 'X thắng cuộc! (OK để chơi lại)';
            alert(rp);
            resetGame();
        }, 100); 
    } else if (count == 9) {
        setTimeout(function() {
            alert('Hòa! (OK để chơi lại)');
            resetGame();
        }, 100);
    } else {
        computerMove();
    }
       
}

function computerMove() {
    var emptyCells = [];
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (board[r][c] === '') {
                emptyCells.push({row: r, col: c});
            }
        }
    }

    if (emptyCells.length > 0) {
        var choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        var button = document.querySelector(`button[row="${choice.row}"][col="${choice.col}"]`);
        button.style.backgroundImage = "url('O.png')";
        board[choice.row][choice.col] = 'O';
        button.setAttribute("disabled", "true");

        if(bool) {
            bool = false;
        } else {
            bool = true;
        }
        count++;

        if (checkWinner()) {
            setTimeout(function() {
                alert(bool ? 'O thắng cuộc! (OK để chơi lại)' : 'X thắng cuộc! (OK để chơi lại)');
                resetGame();
                return;
            }, 100); 
        } else if (count == 9) {
            setTimeout(function() {
                alert('Hòa! (OK để chơi lại)');
                resetGame();
                return;
            }, 100);
        }


        // if (checkWinner()) {
        //     alert('O thắng cuộc!');
        //     resetGame();
        //     return;
        // } else if (count == 9) {
        //     alert('Hòa! (OK để chơi lại)');
        // }
    }
}

function checkWinner() {
    for (var i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
    return false;
}

function resetGame() {
    document.querySelectorAll('button[row]').forEach(button => {
        button.style.backgroundImage = "";
        button.removeAttribute("disabled");
    });
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    count = 0;
    bool = true;
}
