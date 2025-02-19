var player1 = prompt("Player One: Enter Your Name, You will be BLUE");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, You will be RED");
var player2Color = 'rgb(237, 45, 73)';


var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum){
  console.log('you won starting at this row, col');
  console.log(rowNum);
  console.log(colNum);
}


function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}


function returnColor(rowIndex, colIndex){
  console.log("inside returnColor function1")
  console.log(rowIndex,colIndex)
  // return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('backgound-color');
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
  console.log(rowIndex,colIndex)
  console.log("inside returnColor function2")
}


function checkBottom(colIndex){
  console.log("inside checkbottom function")
  var colorReport = returnColor(5,colIndex);
  console.log(colorReport)
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)'){
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one === two && one === three && one == four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

//check for horizontal wins
function horizontalWinCheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1),returnColor(row, col+2),returnColor(row, col+3))){
        console.log('horizontal win');
        reportWin(row, col);
        return true;
        }else{
          continue;
      }
    }
  }
}

//check for vertical wins
function verticalWinCheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col),returnColor(row+2, col), returnColor(row+3, col))){
        console.log('vertical win');
        reportWin(row, col);
        return true;
        }else{
          continue;
      }
    }
  }
}

//check for diagonal wins
function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1),returnColor(row+2, col+2), returnColor(row+3, col+3))){
        console.log('diagonal win');
        reportWin(row, col);
        return true;
      }else if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1),returnColor(row-2, col+2), returnColor(row-3, col+3))){
        console.log('diagonal win');
        reportWin(row, col);
        return true;
      }else {
        continue;
      }
    }
  }
}


// start with player1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+ " it is your turn, pick a column to drop in!")

$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  console.log(col)
  var bottomAvail = checkBottom(col);
  console.log(bottomAvail)
  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+" you have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+" it is your turn")
    currentColor = player1Color
  }else{
    currentName = player2;
    $('h3').text(currentName+" it is your turn")
    currentColor = player2Color
  }
})
