const fs = require('fs');
const path = require('path');
const { Intcode, outputs } = require('../Intcode');

const pathFile = path.join(__dirname, 'input.txt');
const puzzleInput = fs.readFileSync(pathFile, 'utf-8');
const instructionsInput = puzzleInput.split(',');

// Solution part 1
const inputArray1 = [...instructionsInput];
console.log(Intcode(inputArray1, 1));
// Solution part 2
const inputArray2 = [...instructionsInput];
console.log(Intcode(inputArray2, 5));

