export default function movePawn(r, c, chessMatrix){
    let moves = [];
    r = parseInt(r);
    c = parseInt(c);

    if (chessMatrix[r][c] === 'wP') {
        if (r > 0 && chessMatrix[r-1][c] === 0) {
            moves.push({row: r-1, col: c});
            if (r === 6 && chessMatrix[r-2][c] === 0) {
                moves.push({row: r-2, col: c});
            }
        }
        if (r > 0 && c > 0 && chessMatrix[r-1][c-1] !== 0 && chessMatrix[r-1][c-1][0] === 'b') {
            moves.push({row: r-1, col: c-1});
        }
        if (r > 0 && c < 7 && chessMatrix[r-1][c+1] !== 0 && chessMatrix[r-1][c+1][0] === 'b') {
            moves.push({row: r-1, col: c+1});
        }
    }

    if (chessMatrix[r][c] === 'bP') {       
        if (r < 7 && chessMatrix[r+1][c] === 0) {
            moves.push({row: r+1, col: c});
            if (r === 1 && chessMatrix[r+2][c] === 0) {
                moves.push({row: r+2, col: c});
            }
        }
        if (r < 7 && c > 0 && chessMatrix[r+1][c-1] !== 0 && chessMatrix[r+1][c-1][0] === 'w') {
            moves.push({row: r+1, col: c-1});
        }
        if (r < 7 && c < 7 && chessMatrix[r+1][c+1] !== 0 && chessMatrix[r+1][c+1][0] === 'w') {
            moves.push({row: r+1, col: c+1});
        }
    }

    return moves;
}