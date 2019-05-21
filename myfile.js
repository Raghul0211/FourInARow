var player1 = prompt("Enter the player1 name");
var player1Color='yellow';
var player2 = prompt("Enter the player2 name");
var player2Color='blue';
var game_on=true;
var table=$('table tr');

function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(row,column){
  return table.eq(row).find('td').eq(column).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport=returnColor(5,colIndex);
  for(var row = 5;row > -1; row--){
    colorReport = returnColor(row,colIndex);
    console.log(colorReport);
    if(colorReport === 'rgb(0, 0, 0)'){
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one!=='rgb(0, 0, 0)' && one!== undefined);
}

function horizontalWinCheck(){
for(var row=0;row<=5;row++){
  for(var col=0;col<=3;col++){
    if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
      console.log("win");
      return true;
    }
    else {
      continue;
    }
  }
}
}

function verticalWinCheck(){
for(var col=0;col<=6;col++){
  for(var row=0;row<=2;row++){
    if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
      console.log("win");
      return true;
    }
    else {
      continue;
    }
  }
}
}

function diagonalWinCheck(){
for(var col=0;col<=4;col++){
  for(var row=0;row<=6;row++){
    if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
      console.log("win");
      return true;
    }
    else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))) {
      console.log("win");
      return true;
    }
    else {
      continue;
    }
  }
}
}

function gameEnd(winningPlayer){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
  $('h3').fadeOut('fast');
  $('h2').fadeOut('fast');
  $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
}
}
}
var currentPlayer=1;
var currentName=player1;
var currentColor=player1Color;

$('h3').text(player1+": it is your turn,please pick a column to drop your yellow chip.");
$('.board button').on('click',function(){
  var col=$(this).closest("td").index();
  console.log(col);
  var bottomAvail = checkBottom(col);
  console.log(bottomAvail);
  changeColor(bottomAvail,col,currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    gameEnd(currentName);
  }
  currentPlayer=currentPlayer*-1;
  if(currentPlayer===1){
    currentName=player1;
    $('h3').text(currentName+":it is your turn, please pick a column to drop your yellow chip.");
    currentColor=player1Color;
  }
  else {
    currentName=player2;
    $('h3').text(currentName+":it is your turn, please pick a column to drop your blue chip.");
    currentColor=player2Color;
  }
})
