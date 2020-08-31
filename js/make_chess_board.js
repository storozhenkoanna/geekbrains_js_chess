var body = document.body;
body.style.backgroundColor = "grey";
body.style.margin = "0px";
body.style.padding = "0px";
body.style.textAlign = "center";
body.style.fontSize = "25px";
body.style.fontWeight = "bold";

var arrSymbolsList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var arrNumerationRowsList = [8, 7, 6, 5, 4, 3, 2, 1];

var arrFigureOrderOnStart = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

var chessFigureCodes = {
    white: {
        king:   "&#9812;", //korol'
        queen:  "&#9813;", //ferz'
        rook:   "&#9814;", //lad'ya
        bishop: "&#9815;", //slon
        knight: "&#9816;", //kon'
        pawn:   "&#9817;" //peshka
    },
    black: {
        king:   "&#9818;", //korol'
        queen:  "&#9819;", //ferz'
        rook:   "&#9820;", //lad'ya
        bishop: "&#9821;", //slon
        knight: "&#9822;", //kon'
        pawn:   "&#9823;" //peshka
    }
};

var gameState = {};

//---------------------------------------------------------------------------------------------------------------------
function fillNumeration(className, hOrV) {
    var numerationScale = document.getElementsByClassName(className);

    var newValue;

    if (hOrV == 'V') {
        j = 7;
        for (var i = 0; i < numerationScale.length; i++) {
            newValue = numerationScale[j];
            newValue.innerHTML = (i + 1).toString();
            j--;
        }
    } else if (hOrV == 'H') {
        for (var i = 0; i < numerationScale.length; i++) {
            newValue = numerationScale[i];
            newValue.innerHTML = arrSymbolsList[i];
        }
    } else {
        alert("Some error with adding numeration!");
    }
}

//---------------------------------------------------------------------------------------------------------------------
function generateChessBoard() {
    //Create board
    var chessBoard = document.createElement("div");
    chessBoard.className = "chessBoard";
    chessBoard.style.width = "650px";
    chessBoard.style.height = "650px";
    chessBoard.style.margin = "0px auto";
    chessBoard.style.display = "flex";
    chessBoard.style.flexWrap = "wrap";
    body.appendChild(chessBoard);

    //Add squares
    for (var i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            //Create square
            var square = document.createElement("div");
            square.style.width = "10%";
            square.style.height = "10%";

            //Edite horizontal numeration square
            if (i == 0 || i == 9) {
                if (j != 0 && j != 9) {
                    square.style.backgroundColor = "tan";
                    if (i == 0) {
                        square.className = "squareNumerationTopHorizontal";
                    }
                    if (i == 9) {
                        square.className = "squareNumerationBottomHorizontal";
                    }
                } else {
                    square.className = "squareEmpty";
                    square.style.backgroundColor = "SaddleBrown";
                }
            }

            //Edite vertical numeration square
            if (j == 0 || j == 9) {
                if (i != 0 && i != 9) {
                    square.style.backgroundColor = "tan";
                    if (j == 0) {
                        square.className = "squareNumerationLeftVertical";
                    }
                    if (j == 9) {
                        square.className = "squareNumerationRightVertical";
                    }
                }
                else {
                    square.className = "squareEmpty";
                }
            }

            //Edite chess square
            if (i != 0 && j != 0 && i != 9 && j != 9) {
                //square.style.backgroundColor = "Sienna";
                square.style.fontSize = "45px";
                var intRowNum = arrNumerationRowsList[i - 1];
                var strColNum = arrSymbolsList[j - 1];
                square.className = "square" + " " + "row" + intRowNum + " " + "col" + strColNum + " " + strColNum + intRowNum;
                square.id = strColNum + intRowNum;

                if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0)) {
                    square.style.backgroundColor = "Sienna";
                } else {
                    square.style.backgroundColor = "blanchedalmond";
                }
            }

            chessBoard.appendChild(square);

            //Add empty text in square
            var textElement = document.createTextNode("");
            square.appendChild(textElement);
        }
    }

    //Fill numerations
    fillNumeration("squareNumerationTopHorizontal", "H");
    fillNumeration("squareNumerationBottomHorizontal", "H");
    fillNumeration("squareNumerationLeftVertical", "V");
    fillNumeration("squareNumerationRightVertical", "V");
}

//---------------------------------------------------------------------------------------------------------------------
function fillStartingBoardRow(row) {
    var cells = document.getElementsByClassName(row);
    var square;
    var figure, figureName, figureColor, position, onboard;

    gameState[row] = [];

    for (var i = 0; i < cells.length; i++) {
        square = cells[i];
        position = square.id;

        switch (row) {
            case "row7": {
                figure = chessFigureCodes.black.pawn;
                figureColor = "black";
                figureName = "pawn" + (i + 1);
                onboard = true;
                break;
            };

            case "row2": {
                figure = chessFigureCodes.white.pawn;
                figureColor = "white";
                figureName = "pawn" + (i + 1);
                onboard = true;
                break;
            };

            case "row8": {
                figure = chessFigureCodes.black[arrFigureOrderOnStart[i]];
                figureColor = "black";
                figureName = arrFigureOrderOnStart[i];
                onboard = true;
                break;
            };

            case "row1": {
                figure = chessFigureCodes.white[arrFigureOrderOnStart[i]];
                figureColor = "white";
                figureName = arrFigureOrderOnStart[i];
                onboard = true;
                break;
            };

            default: {
                figure = "";
                figureColor = "";
                figureName = "";
                onboard = false;
                break;
            }
        }

        square.innerHTML = figure;

        //Create object for square
        var tmp = {};
        tmp.color = figureColor;
        tmp.name = figureName;
        tmp.code = figure;
        tmp.position = position;
        tmp.onboard = onboard;

        gameState[row].push(tmp);
    }
}

//---------------------------------------------------------------------------------------------------------------------
function generateStartingPositionFigures () {
    //Fill starting positions of figure
    for (var i = 8; i > 0; i--) {
        fillStartingBoardRow("row" + i);
    }
}

//---------------------------------------------------------------------------------------------------------------------
function deleteFigure (strPosition) {
    //Remove figure from data structure gameState
    var intRowNum = strPosition[1];
    var intColNum = arrSymbolsList.indexOf(strPosition[0]);
    var cell = gameState["row" + intRowNum][intColNum];
    cell.color = "";
    cell.name = "";
    cell.code = "";
    cell.onboard = false;

    //Delete figure from board visually
    var tmp = document.getElementById(strPosition);
    tmp.innerHTML = "";
}

//---------------------------------------------------------------------------------------------------------------------
function moveFigure(start, end) {
    //Copy from start position to end position in gameState
    var intRowNumStart = start[1];
    var intColNumStart = arrSymbolsList.indexOf(start[0]);
    var startCell = gameState["row" + intRowNumStart][intColNumStart];

    //Add in the end position in gameState
    var intRowNumEnd = end[1];
    var intColNumEnd = arrSymbolsList.indexOf(end[0]);
    var endCell = gameState["row" + intRowNumEnd][intColNumEnd];
    endCell.color = startCell.color;
    endCell.name = startCell.name;
    endCell.code = startCell.code;
    endCell.onboard = startCell.onboard;

    //Add figure in the end position visually
    var tmp = document.getElementById(end);
    tmp.innerHTML = endCell.code;


    //Delete from start
    deleteFigure(start);

}

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//Task 1 Genereate chess board
generateChessBoard();

//Task2-3 Generate figures
generateStartingPositionFigures();

//Some operation with figures
moveFigure("A8", "C5");
console.log(gameState);