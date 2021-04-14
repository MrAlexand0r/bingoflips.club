const bingoTiles = [
    'Wheel of Fortune Break',
    'Hardcore Choke',
    'Tetris Break',
    '*rhymes 3 words* Bars?',
    'VS level that ends in a horizontal section',
    'VS level that ends with fast conveyors',
    'Pointless key door scramble',
    '"I wanted to walljump there"',
    '2FPS Lag lobby',
    'Last to checkpoint',
    'BlurryFlips',
    '"Just took a break"',
    'Forgets to vote',
    'Likes out of joy',
    'Boos out of anger',
    '"I can\'t make this jump"',
    'Reminds the viewer that he can, in fact, run as Link',
    'Dies right before someone else wins',
    '"It\'s pretty hard for me to win in SMB1"',
    '"Boss fight? 11 bosses? Choke point?"',
    'Ends with fewer points than he started with',
    'Ends with more points than he started with',
    'Rare Homie Sighting',
    'Forgets he can longjump in 3D World',
    '"Yeah I lose this one for sure" (and loses)',
    '"Yeah I lose this one for sure" (and wins)',
    'Impossible Fast Conveyor',
    'Tries to cheese and looses because of that',
    'Sudden 1v1',
    'Died to Boom Boom',
    'More than 3 Boom Booms'
];

document.getElementById("bingo-container").innerHTML = generateBingoCard();

Splitting({
	whitespace: true
});

const counterContainerEl = document.getElementById('counter-container');
const bingoCounterEl = document.getElementById('bingo-counter');
let bingoCount = 0;

document.querySelectorAll('.bingo-tile').forEach(e =>
    e.addEventListener('click', event => {
        event.target.className = `bingo-tile ${event.target.className.includes('cunked') ? '' : 'cunked'}`;

        checkBingoCount();
    })
);

function generateBingoCard() {
    const randomBingoTiles = bingoTiles.sort((a, b) => 0.5 - Math.random()).slice(0, 25);
    randomBingoTiles[12] = "T W O (Free Space)";
    return randomBingoTiles.map(tile => `
    <div class="bingo-tile">${tile}</div>
    `).join("");
}

function checkBingoCount() {
    const tiles = document.querySelectorAll('.bingo-tile');

    let row = 0;
    let column = 0;
    const prevBingoCount = bingoCount;
    const tilesMatrix = getMatrix(5);

    tiles.forEach((tile, i) => {
        column = i % 5;
        row = Math.floor(i / 5);
        tilesMatrix[row][column] = tile.classList.contains('cunked'); // fill bool matrix
    });

    bingoCount = 0;
    bingoCount += rowSolver(tilesMatrix);
    bingoCount += columnSolver(tilesMatrix);
    bingoCount += diagonalSolver(tilesMatrix);

    // show counter when we have bingo
    counterContainerEl.className = (bingoCount > 0) ? 'visible' : '';
    bingoCounterEl.innerHTML = bingoCount > 1 ? bingoCount : '';

    if (bingoCount > prevBingoCount) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function rowSolver(matrix) {
    return matrix.reduce((carry, row) => {
        return row.reduce((c, tile) => c && tile) ? carry + 1 : carry;
    }, 0);
};

function columnSolver(matrix) {
    return rowSolver(rotateMatrix(5, matrix));
};

function diagonalSolver(matrix) {
    let wins = 0;

    // i x i
    const leftToRight = matrix.reduce((carry, row, i) => {
        return carry && row[i];
    }, true);

    // i x length - i
    const rightToLeft = matrix.reduce((carry, row, i) => {
        return carry && row[row.length - 1 - i];
    }, true);

    if (leftToRight) wins++;
    if (rightToLeft) wins++;

    return wins;
}

// returns an N x N matrix
function getMatrix(n) {
    mat = [];
    for (i = 0; i < n; i++) {
        mat.push(Array.apply(null, {length: n}).map(() => null));
    }

    return mat;
}

// rotate a 2D array by 90 degrees in counter-clockwise direction
function rotateMatrix(n, matrix) {
    transpose = (m) => m[0].map((x,i) => m.map(x => x[i]));

    return transpose(matrix);
}
