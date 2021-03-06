"use strict";

// Segédfüggvények

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Adatszerkezetek

var game, x, y, 
    mineCount, mineRem,
    isFirst;

// Eseménykezelők

$('#start').addEventListener('click', init);

function init() {
    x = $('#x').value;
    y = $('#y').value;
    mineCount = $('#akna').value;
    isFirst = true;
    $('#game').innerHTML = '';
    
    for (var i = 0; i < y; i++) {
        var row = document.createElement('TR');
        for (var j = 0; j < x; j++) {
            var cell = document.createElement('TD');
            var button = document.createElement('BUTTON');
            button.setAttribute('data-x', j.toString());
            button.setAttribute('data-y', i.toString());
            button.addEventListener('click', step);
            button.innerHTML = '&nbsp;';
            cell.appendChild(button);
            row.appendChild(cell);
        }
        $('#game').appendChild(row);
    }
}

function generate(cX, cY) {
    // Feltöltöm a táblázatot üres elemekkel
    game = [];
    for (var i = 0; i < x; i++) {
        game[i] = [];
        for (var j = 0; j < y; j++) {
            game[i][j] = {
                val: 0,
                rev: false
            };
        }
    }
    // Lerakom az aknákat
    for (var i = 0; i < mineCount; i++) {
        var mX, mY;
        do {
            mX = Math.floor(Math.random() * x);
            mY = Math.floor(Math.random() * y);
        } while((mX == cX && mY == cY) || (game[mX][mY].val == -1));
        //console.log(mX, mY);
        game[mX][mY].val = -1;
        for (var j = -1; j <= 1; j++) {
            for (var k = -1; k <= 1; k++) {
                if ((mX + j >= 0 && mY + k >= 0 && 
                    mX + j < x && mY + k < y)) {
                    if ((game[mX + j][mY + k].val != -1))  {     
                        game[mX + j][mY + k].val++;
                    }
                }
            }
        }
    }
}

function step() {
    var cX = parseInt(this.getAttribute('data-x'));
    var cY = parseInt(this.getAttribute('data-y'));
    if (isFirst) {
        generate(cX, cY);
        isFirst = false;
    }
    //console.log(cX, cY, game[cX][cY].val);
    $('#game').rows[cY].cells[cX].innerHTML = game[cX][cY].val.toString();
}