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
exports.generateMaze = generateMaze;