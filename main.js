import moveBishop from "./pieceMoves/bishop.js";
import moveKing from "./pieceMoves/king.js";
import moveKnight from "./pieceMoves/knight.js";
import movePawn from "./pieceMoves/pawn.js";
import moveQueen from "./pieceMoves/queen.js";
import moveRook from "./pieceMoves/rook.js";

let chessMatrix = [
    ['bR','bN','bB','bQ','bK','bB','bN','bR'],
    ['bP','bP','bP','bP','bP','bP','bP','bP'],
    [  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0],
    ['wP','wP','wP','wP','wP','wP','wP','wP'],
    ['wR','wN','wB','wQ','wK','wB','wN','wR']
]

const pieceSymbols = {
    'wK':'♔','wQ':'♕','wR':'♖','wB':'♗','wN':'♘','wP':'♙',
    'bK':'♚','bQ':'♛','bR':'♜','bB':'♝','bN':'♞','bP':'♟'
}

let currentTurn = 'w';
const turnIndicatorElement = document.getElementById("turn-indicator");

function updateTurnDisplay() {
    if (currentTurn === 'w') {
        turnIndicatorElement.textContent = "White's Turn";
    } else {
        turnIndicatorElement.textContent = "Black's Turn";
    }
}

function renderChess() {
    let chessBoard = document.getElementById("board");
    for (let i = 0; i < chessMatrix.length; i++) {
        for (let j = 0; j < chessMatrix[i].length; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = i;
            square.dataset.col = j;
            if ((i + j) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }
            chessBoard.appendChild(square);
        }
    }
}

function renderPieces() {
    document.querySelectorAll(".square").forEach((square, index) => {
        let row = Math.floor(index / 8);
        let col = index % 8;
        let cell = chessMatrix[row][col];

        if (cell !== 0) {
            let piece = document.createElement('div');
            piece.classList.add('piece');
            piece.dataset.row = row; 
            piece.dataset.col = col;
            piece.dataset.code = cell;
            piece.textContent = pieceSymbols[cell];
            piece.draggable = true;
            square.appendChild(piece);
        }
    });
}

function movePiece(r1, c1, r2, c2){
    // matrix update
    let piece = chessMatrix[r1][c1];

    if (piece === 'wP' && r2 === 0) piece = 'wQ';
    if (piece === 'bP' && r2 === 7) piece = 'bQ';
    
    chessMatrix[r2][c2] = piece
    chessMatrix[r1][c1] = 0;
    // html update
    document.querySelectorAll(".square").forEach((square, index) => {
        let row = Math.floor(index / 8);
        let col = index % 8;
        if ((row === r1 && col === c1) || (row === r2 && col === c2)) {
            square.innerHTML = '';
            let cell = chessMatrix[row][col];
            if (cell !== 0) {
                let newPiece = document.createElement('div');
                newPiece.classList.add('piece');
                newPiece.dataset.row = row; 
                newPiece.dataset.col = col;
                newPiece.dataset.code = cell;
                newPiece.textContent = pieceSymbols[cell];
                newPiece.draggable = true;
                square.appendChild(newPiece);
            }
        }
    })
}

function dragAndDropPieces() {
    let draggedPiece = null;
    let validMoves = [];

    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("piece")) {

            let colorCode = e.target.dataset.code;

            if (colorCode[0] !== currentTurn) {
                e.preventDefault(); 
                return;
            }

            draggedPiece = e.target;
            let row = parseInt(draggedPiece.dataset.row);
            let col = parseInt(draggedPiece.dataset.col);
            let code = draggedPiece.dataset.code;

            validMoves.splice(0, validMoves.length);

            if (code === 'wP' || code === 'bP') validMoves.push(...movePawn(row, col, chessMatrix));
            if (code === 'wR' || code === 'bR') validMoves.push(...moveRook(row, col, chessMatrix));
            if (code === 'wQ' || code === 'bQ') validMoves.push(...moveQueen(row, col, chessMatrix));
            if (code === 'wK' || code === 'bK') validMoves.push(...moveKing(row, col, chessMatrix));
            if (code === 'wB' || code === 'bB') validMoves.push(...moveBishop(row, col, chessMatrix));
            if (code === 'wN' || code === 'bN') validMoves.push(...moveKnight(row, col, chessMatrix));

            e.target.classList.add("dragging");
        }
    });

    document.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("piece")) {
            e.target.classList.remove("dragging");
            draggedPiece = null;
            validMoves.splice(0, validMoves.length);
        }
    });

    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("dragover", (e) => {
            e.preventDefault();
            square.classList.add("drag-over");
        });

        square.addEventListener("dragleave", () => {
            square.classList.remove("drag-over");
        });

        square.addEventListener("drop", (e) => {
            e.preventDefault();
            square.classList.remove("drag-over");

            if (draggedPiece) {
                let r1 = parseInt(draggedPiece.dataset.row);
                let c1 = parseInt(draggedPiece.dataset.col);
                let targetRow = parseInt(square.dataset.row);
                let targetCol = parseInt(square.dataset.col);

                const isAllowed = validMoves.some(move => move.row === targetRow && move.col === targetCol);

                if (isAllowed) {
                    movePiece(r1, c1, targetRow, targetCol);
                    currentTurn = currentTurn === 'w' ? 'b' : 'w';
                    updateTurnDisplay();
                } else {
                    console.log("Invalid move!");
                }
            }
        });
    });
}



renderChess();
renderPieces();
dragAndDropPieces()