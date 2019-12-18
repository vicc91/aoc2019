const fs = require('fs');
const path = require('path');
const { Intcode } = require('../Intcode');

// Permutations
const permutationsPartOne = require('./permutations').permutations([0,1,2,3,4]);
const permutationsPartTwo = require('./permutations').permutations([5,6,7,8,9]);

const pathFile = path.join(__dirname, 'input.txt');
const puzzleInput = fs.readFileSync(pathFile, 'utf-8');
const instructionsInput = puzzleInput.split(',').map(el => +el);

function outputSignal(sequence) {
    let nextStdin = 0;
    for (nextPhase of sequence) {
        const computer = new Intcode(instructionsInput);
        computer.stdin.push(nextPhase);
        computer.stdin.push(nextStdin);
        computer.simulate();
        nextStdin = computer.stdout.pop();
    }
    return nextStdin;
}

function outputSignalLoop(sequence) {
    const computers = [];
    for (nextPhase of sequence) {
        const computer = new Intcode(instructionsInput);
        computer.stdin.push(nextPhase);
        computers.push(computer);
    }
    let computer = 0;
    let nextComputer = 1;
    computers[computer].stdin.push(0);
    let lastOutput = 0;
   
    while (true) {
        while (computers[computer].stdout.length === 0) {
            computers[computer].step();
            if (computers[computer].stop()) {
                return lastOutput;
            }
        }
        lastOutput = computers[computer].stdout.pop();
        computers[nextComputer].stdin.push(lastOutput);
        computer = nextComputer;
        nextComputer = (nextComputer + 1) % 5;
    }
}

function solutionPartOne() {
    const values = [];
    for (perm of permutationsPartOne) {
        values.push(outputSignal(perm));
    }
    return Math.max(...values);
}
function solutionPartTwo() {
    const values = [];
    for (perm of permutationsPartTwo) {
        values.push(outputSignalLoop(perm));
    }
    return Math.max(...values);
}
// Solution part 1
console.log('Solution part 1:', solutionPartOne());
// Solution part 2
console.log('Solution part 2:', solutionPartTwo());
