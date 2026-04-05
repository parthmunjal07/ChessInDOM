export default function moveKing(r, c, chessMatrix) {
    let moves = [];
    const currentPiece = chessMatrix[r][c];
    
    const myColor = currentPiece[0]; 

    const directions = [
        [-1, -1], [-1, 0], [-1, 1], // Top-Left, Top, Top-Right
        [0, -1],           [0, 1],  // Left, Right
        [1, -1],  [1, 0],  [1, 1]   // Bottom-Left, Bottom, Bottom-Right
    ];

    for (let i = 0; i < directions.length; i++) {
        const rowOffset = directions[i][0];
        const colOffset = directions[i][1];

        const targetRow = parseInt(r) + rowOffset;
        const targetCol = parseInt(c) + colOffset;

        if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
            const targetSquare = chessMatrix[targetRow][targetCol];

            if (targetSquare === 0 || String(targetSquare)[0] !== myColor) {
                moves.push({ row: targetRow, col: targetCol });
            }
        }
    }

    return moves;
}