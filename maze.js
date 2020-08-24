const keypress = require('keypress');
const color = require('cli-color');
keypress(process.stdin);
var boardArray = generateMaze(100, 20);
let position = [5, 5, 5, 5]; //x,y, previousX,previousY
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


function generateMaze(x, y) {
    let maze = []
    for (let i = 0; i < y; i++) {
        maze.push([]);
    }
    maze.forEach(element => {
        for (let i = 0; i < x; i++) {
            element.push(1);
        }
    })
    recursive(5, 5);
    maze[5][5] = 2
    return maze;
    function recursive(rows, cols) {
        let randDirs = getRandomDirections()
        function getRandomDirections() {
            let randoms = [];
            for (let i = 0; i < 4; i++) {
                randoms.push(i + 1);
            }
            return shuffle(randoms);
            function shuffle(array) {
                let counter = array.length;
                while (counter > 0) {
                    let index = Math.floor(Math.random() * counter);
                    counter--;
                    let temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            }
        }
        for (let i = 0; i < randDirs.length; i++) {
            switch (randDirs[i]) {
                case 1:
                    if (cols - 2 <= -1) return;
                    if (maze[cols - 2][rows] != 0) {
                        maze[cols - 2][rows] = 0;
                        maze[cols - 1][rows] = 0;
                        recursive(rows, cols - 2)
                    }
                    break;
                case 2:
                    if (rows + 2 >= x) return;
                    if (maze[cols][rows + 2] != 0) {
                        maze[cols][rows + 2] = 0;
                        maze[cols][rows + 1] = 0;
                        recursive(rows + 2, cols);
                    }
                case 3:
                    if (cols + 2 >= y + 1) return;
                    if (maze[cols + 2][rows] != 0) {
                        maze[cols + 2][rows] = 0;
                        maze[cols + 1][rows] = 0;
                        recursive(rows, cols + 2)
                    }
                case 4:
                    if (rows - 2 <= 0) return;
                    if (maze[cols][rows - 2] != 0) {
                        maze[cols][rows - 2] = 0;
                        maze[cols][rows - 1] = 0;
                        recursive(rows - 2, cols);
                    }
            }
        }
    }
}

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
}


process.stdin.setRawMode(true);
process.stdin.resume();
