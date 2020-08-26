const keypress = require('keypress');
const color = require('cli-color');
const generateMaze = require('./mazeGeneration').generateMaze;
const gameMechanics = require('./gameMechanics');
const args = process.argv;
if (args.find((arg) => {return arg == "--help"})) {
    return console.log(`y u need halp? Dis ez 2 uz. k fwine...\n
    -g, --game-type gametype | Set a game type. (blackout, classic, invisible ) | Default: blackout
    -s, --save filename | Save the current maze state and gametype to a file | Default: none
    -r, --restore filename | Loads a previously saved maze state and gametype from a file | Default: none
    -R, --trail true/false | 
    `);
}
keypress(process.stdin);
var boardArray = generateMaze(10, 10); //width, height
let position = [5, 5, 5, 5]; //x,y, previousX,previousY
let amtOfPaths = 0;
boardArray.forEach(element => {
    element.forEach(element => {
        if (element == 0) {
            amtOfPaths++;
        }
    })
});
render(boardArray);
process.stdin.on('keypress', function (ch, key) {
    if (key.name == 'return') process.stdin.pause();
    if (key.name == 'w' && position[1] - 1 != -1) {
        if (boardArray[position[1] - 1][position[0]] == 1) return;
        position[3] = position[1];
        position[2] = position[0];
        position[1]--;
        boardArray[position[1]][position[0]] = 2
        boardArray[position[3]][position[2]] = 3
    }
    if (key.name == 'd' && position[0] + 1 != boardArray[0].length) {
        if (boardArray[position[1]][position[0] + 1] == 1) return;
        position[3] = position[1];
        position[2] = position[0];
        position[0]++;
        boardArray[position[1]][position[0]] = 2
        boardArray[position[3]][position[2]] = 3
    }
    if (key.name == 's' && position[1] + 1 < boardArray.length) {
        if (boardArray[position[1] + 1][position[0]] == 1) return;
        position[3] = position[1];
        position[2] = position[0];
        position[1]++;
        boardArray[position[1]][position[0]] = 2
        boardArray[position[3]][position[2]] = 3
    }
    if (key.name == 'a' && position[0] - 1 != -1) {
        if (boardArray[position[1]][position[0] - 1] == 1) return;
        position[3] = position[1];
        position[2] = position[0];
        position[0]--;
        boardArray[position[1]][position[0]] = 2
        boardArray[position[3]][position[2]] = 3
    }
    render(boardArray);
});
function render(boardArray) {
    let string = `\n\n\n\n\n\n\n\n\n`;
    for (let i = 0; i < boardArray[0].length + 2; i++) {
        string = string + '_';
    }
    string = string + '\n|'
    boardArray.forEach(element => {
        element.forEach(element => {
            if (element == 0) string = string + " ";
            if (element == 1) string = string + "▇";
            if (element == 2) string = string + "C";
            if (element == 3) string = string + color.red("▇");
        })
        string = string + "|\n|";
    })
    string = string.substring(0, string.length - 1);
    for (let i = 0; i < boardArray[0].length + 2; i++) {
        string = string + '=';
    }
    console.log(string);
    gameMechanics.checkBoard(boardArray,amtOfPaths);
}


process.stdin.setRawMode(true);
process.stdin.resume();
