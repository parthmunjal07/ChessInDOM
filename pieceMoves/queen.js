export default function moveQueen(r, c, chessMatrix) {
    let moves = [];
    const currentPiece = chessMatrix[r][c]; 
    const myColor = currentPiece[0]; 

    function slide(rowOffset, colOffset) { 

        let currentRow = parseInt(r) + rowOffset;
        let currentCol = parseInt(c) + colOffset;

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

    // --- The Rook's Directions (Straight) ---
    slide(-1, 0); // Up
    slide(1, 0);  // Down
    slide(0, -1); // Left
    slide(0, 1);  // Right

    // --- The Bishop's Directions (Diagonal) ---
    slide(-1, -1); // Top-Left
    slide(-1, 1);  // Top-Right
    slide(1, -1);  // Bottom-Left
    slide(1, 1);   // Bottom-Right

    return moves;
}