export default function moveBishop(r, c, chessMatrix) {
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

    slide(-1, -1); // Top-Left
    slide(-1, 1);  // Top-Right
    slide(1, -1);  // Bottom-Left
    slide(1, 1);   // Bottom-Right

    return moves;
}