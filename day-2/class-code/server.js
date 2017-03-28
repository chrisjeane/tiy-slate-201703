let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let readDir = BBPromise.promisify(fs.readdir);
let readFile = BBPromise.promisify(fs.readFile);

var games = []
let base_path = './sandwich'

function readGame(fileName) {
  return readFile(`${base_path}/${fileName}`)
    .then((data) => {
      return TicTacToeGame.fromJson(data);
    })
}

readDir(base_path)
  .then((files) => {
    return BBPromise.map(files, readGame)
  })
  .then((new_games) => {
    games = new_games
    console.log("Created these games: ", games);
  })
  .catch(err => console.error(err))
