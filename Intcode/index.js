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

function actionOptionCode(code, parameterMode1, parameterMode2, parameterMode3, instructions, index, outputs) {
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
            outputs.push(parameter1);
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

function Intcode(instructionsInput, initialCode) {
    const outputs = [];
    stdin[0] = initialCode;

    for (let i=0; i<instructionsInput.length; i++) {
        const { optionCode, parameterMode1, parameterMode2, parameterMode3 } = readInstruction(instructionsInput[i]);
        const [ countToNextOption, isJumpedIndex ] = actionOptionCode(
            optionCode,
            parameterMode1,
            parameterMode2,
            parameterMode3,
            instructionsInput,
            i,
            outputs
        );
        
        if (isJumpedIndex) {
            i = countToNextOption-1;
        } else {
            i += countToNextOption - 1;
        }

        if (countToNextOption === 99) break;
    }
    return outputs;
}

module.exports = {
    Intcode
}