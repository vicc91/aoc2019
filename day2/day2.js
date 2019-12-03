const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'input.txt');

const inputArray = fs.readFileSync(pathFile, 'utf-8')
    .split(',')
    .map(el => +el);

function calculateValueAddressZero(array, noun, verb) {
    array[1] = noun;
    array[2] = verb;
    for (let i=0; i<array.length; i+=4) {
        switch (array[i]) {
            case 1:
                array[array[i+3]] = array[array[i+1]] + array[array[i+2]];
                break;
            case 2:
                array[array[i+3]] = array[array[i+1]] * array[array[i+2]];
                break;
            case 99:
                return array[0];
            default:
                console.log('Ups, algo salio mal');
                break;
        }   
    }
}

function solutionPartOne() {
    const array = [...inputArray];
    return calculateValueAddressZero(array, 12, 2);
}

function solutionPartTwo() {
    for (let noun=0; noun<inputArray.length; noun++) {
        for (let verb=0; verb<inputArray.length; verb++) {
            const array = [...inputArray];
            const valueAddressZero = calculateValueAddressZero(array, noun, verb);
            if (valueAddressZero === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
}
// Solution Part 1
console.log(solutionPartOne());
// Solution Part 2
console.log(solutionPartTwo());