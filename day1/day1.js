const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'input.txt');

const inputArray = fs.readFileSync(pathFile, 'utf-8').split('\n');

function fuelForMass(mass) {
    return Math.floor(+mass / 3) - 2;
}

function fuelForFuel(fuel) {
    const currentFuel = fuelForMass(fuel)
    if (currentFuel <= 0) {
        return fuel;
    } else {
        return fuel + fuelForFuel(currentFuel)
    }
}

function solutionPartOne(array) {
    return array.reduce((accumulator, currentValue) => {
        const fuelModule = fuelForMass(currentValue);
        return fuelModule + accumulator;
    }, 0);
}

function solutionPartTwo(array) {
    return array.reduce((accumulator, currentValue) => {
        const fuelModule = fuelForFuel(fuelForMass(currentValue));
        return fuelModule + accumulator;
    }, 0);
}
// Solution part 1
console.log(solutionPartOne(inputArray));
// Solution part 2
console.log(solutionPartTwo(inputArray));