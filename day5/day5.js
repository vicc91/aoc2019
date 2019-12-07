const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'input.txt');
const puzzleInput = fs.readFileSync(pathFile, 'utf-8');
const instructionsInput = puzzleInput.split(',');
const stdin = [];

function readInstruction(instruction) {
    const optionCode = instruction % 100;
    const parameterMode1 = parseInt(instruction / 100) % 10;
    const parameterMode2 = parseInt(instruction / 1000) % 10;
    const parameterMode3 = parseInt(instruction / 10000) % 10;
    return {
        optionCode,
        parameterMode1,
        parameterMode2,
        parameterMode3
    };
}

function actionOptionCode(code, parameterMode1, parameterMode2, parameterMode3, instructions, index) {
    let parameter1, parameter2, parameter3;
    if (code === 1 || code === 2 || code === 4 || code === 5 || code === 6 || code === 7 || code === 8) {
        parameter1 = parameterMode1 === 0 ? +instructions[instructions[index+1]] : +instructions[index+1];
        parameter2 = parameterMode2 === 0 ? +instructions[instructions[index+2]] : +instructions[index+2];
    } else {
        parameter1 = +instructions[index+1];
    }
    parameter3 = +instructions[index+3];
    switch (code) {
        case 1:
            instructions[parameter3] = parameter1 + parameter2;
            return [4, false];
        case 2:
            instructions[parameter3] = parameter1 * parameter2;
            return [4, false];
        case 3:
            instructions[parameter1] = stdin.pop();
            return [2, false];
        case 4:
            console.log(parameter1);
            return [2, false];
        case 5:
            if (parameter1 !== 0) {
                return [parameter2, true];
            } else {
                return [3, false];
            }
        case 6: 
            if (parameter1 === 0) {
                return [parameter2, true];
            } else {
                return [3, false];
            }
        case 7:
            if (parameter1 < parameter2) {
                instructions[parameter3] = 1;
            } else {
                instructions[parameter3] = 0;
            }
            return [4, false];
        case 8: 
            if (parameter1 === parameter2) {
                instructions[parameter3] = 1;
            } else {
                instructions[parameter3] = 0;
            }
            return [4, false];
        case 99:
            console.log("End program.");
            return [99, null];
        default:
            console.log('Código no válido.');
            return;
    }
}

function solutionDayFive(part) {
    stdin[0] = part === 'ONE' ? 1 : 5;
    
    const array = [...instructionsInput];

    for (let i=0; i<array.length; i++) {
        const { optionCode, parameterMode1, parameterMode2, parameterMode3 } = readInstruction(array[i]);
        const [ countToNextOption, isJumpedIndex ] = actionOptionCode(optionCode, parameterMode1, parameterMode2, parameterMode3, array, i);
        
        if (isJumpedIndex) {
            i = countToNextOption-1;
        } else {
            i += countToNextOption - 1;
        }

        if (countToNextOption === 99) break;
    }
}
// Solution part 1
solutionDayFive('ONE');
// Solution part 2
solutionDayFive('TWO');

