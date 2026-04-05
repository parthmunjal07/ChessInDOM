export default function movePawn(r, c, chessMatrix){
    let moves = [];

    if (chessMatrix[r][c] === 'wP') {
        if (r > 0 && chessMatrix[r-1][c] === 0) {
            moves.push({row: r-1, col: c});
            
            if (r === 6 && chessMatrix[r-2][c] === 0) {
                moves.push({row: r-2, col: c});
            }
        }
    }

    if (chessMatrix[r][c] === 'bP') {       
        if (r < 7 && chessMatrix[r+1][c] === 0) {
            moves.push({row: r+1, col: c});
            
            if (r === 1 && chessMatrix[r+2][c] === 0) {
                moves.push({row: r+2, col: c});
            }
        }
    }

    return moves;
}