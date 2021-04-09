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
    'Sudden 1v1'
];

console.log(bingoTiles);

document.getElementById("bingo-container").innerHTML = generateBingoCard();

document.querySelectorAll('.bingo-tile').forEach(e =>
    e.addEventListener('click', event => {
            event.target.className = `bingo-tile ${event.target.className.includes('cunked') ? '' : 'cunked'}`;
    })
);

function generateBingoCard() {
    const randomBingoTiles = bingoTiles.sort((a, b) => 0.5 - Math.random()).slice(0, 25);
    randomBingoTiles[12] = "T W O (Free Space)";
    return randomBingoTiles.map(tile => `
    <div class="bingo-tile">${tile}</div>
    `).join("");
}