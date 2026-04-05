export default function moveKnight(r, c, chessMatrix) {
    let moves = [];
    const currentPiece = chessMatrix[r][c];
    const myColor = currentPiece[0];

    const directions = [
        [-2, -1], [-2, 1], // Up 2, Left 1 & Right 1
        [-1, -2], [-1, 2], // Up 1, Left 2 & Right 2
        [1, -2],  [1, 2],  // Down 1, Left 2 & Right 2
        [2, -1],  [2, 1]   // Down 2, Left 1 & Right 1
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