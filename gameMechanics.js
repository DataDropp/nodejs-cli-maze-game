function checkBoard(boardArray,amtOfPaths) {
    let amtOfTrails = 0;
    boardArray.forEach(element => {
        element.forEach(element => {
            if (element == 3) amtOfTrails++;
        })
    })
    // console.log(amtOfTrails,amtOfPaths);
    if (amtOfTrails == amtOfPaths) {
        process.stdin.pause();
        return console.log(`YOU COMPLETED MAZE GAME | GAME TYPE: 'BLACK OUT'`)
    }
}
exports.checkBoard = checkBoard;