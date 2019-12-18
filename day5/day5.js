const fs = require('fs');
const path = require('path');
const { Intcode } = require('../Intcode');

const pathFile = path.join(__dirname, 'input.txt');
const puzzleInput = fs.readFileSync(pathFile, 'utf-8');
const instructionsInput = puzzleInput.split(',').map(el => +el);

// Solution part 1
const inputArray1 = [...instructionsInput];
const computer1 = new Intcode(inputArray1);
computer1.stdin.push(1);
computer1.simulate();
console.log('Solution part 1', computer1.stdout);

// Solution part 2
const inputArray2 = [...instructionsInput];
const computer2 = new Intcode(inputArray2);
computer2.stdin.push(5);
computer2.simulate();
console.log('Solution part 2', computer2.stdout);

