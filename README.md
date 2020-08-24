# nodejs-cli-maze-game

Command line maze game using [DFS](https://en.wikipedia.org/wiki/Depth-first_search) in combination of 2D arrays.
Written in JavaScript in a NodeJS enviroment.

## Setup

Install dependencies from [npm](https://www.npmjs.com/)

```
npm install keypress
npm install cli-color
```

## Features

* No need for a desktop to play, only a command line. (Great for bored server administrators)
* 'Black out' - Run down every path in the maze to win (by default right now)
* Leaves a red trail to show you where you have been.

## Todo

* [ ] Add game menu
* [ ] Add more game types (Lights out, Classical point A to point B, invisible maze)
* [ ] Option to save current maze state to a file (bitmap).
* [ ] Option to load previously saved maze state from a file (bitmap).
* [ ] Option to toggle red trail.

## Usage

```
node maze.js
```

To exit the program press ENTER (return);

## What is should look like

https://i.imgur.com/ABl6LLt.png

# Note

I am unsure if my code is 'good' at all, I could probably optimize a ton of things within the code to make it faster and smaller file size. Constructive criticism appreciated
