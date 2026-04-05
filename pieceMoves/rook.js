export default function moveRook(r, c, chessMatrix) {
    let moves = [];
    const currentPiece = chessMatrix[r][c]; 
    
    const myColor = currentPiece[0]; 

    function slide(rowOffset, colOffset) {
        let currentRow = r + rowOffset;
        let currentCol = c + colOffset;

        while (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
            const targetSquare = chessMatrix[currentRow][currentCol];

            if (targetSquare === 0) {
                moves.push({ row: currentRow, col: currentCol });
            } else {
                const targetColor = String(targetSquare)[0]; 

                if (targetColor !== myColor) {
                    moves.push({ row: currentRow, col: currentCol });
                }
                
                break; 
            }

            currentRow += rowOffset;
            currentCol += colOffset;
        }
    }

    slide(-1, 0); // UP (decrease row)
    slide(1, 0);  // DOWN (increase row)
    slide(0, -1); // LEFT (decrease col)
    slide(0, 1);  // RIGHT (increase col)

    return moves;
}