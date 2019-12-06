const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'input.txt');

const [wireA, wireB] = fs.readFileSync(pathFile, 'utf-8').split('\n');
const instructionsWireA = wireA.split(',');
const instructionsWireB = wireB.split(',');

function getInstructions(wire) {
    return wire.map(instruction => {
        const [_, direction, countAction] = instruction.match(/([RULD])(\d*)/);
        return [direction, countAction];
    });
}

function getCoordsInstruction(initialCoords, instruction) {
    let [x, y] = initialCoords;
    const [direction, countAction] = instruction;
    const coords = [];

    for (let i=0; i<countAction; i++) {
        switch (direction) {
            case 'R':
                x = x + 1;
                break;
            case 'L':
                x = x - 1;
                break;
            case 'U':
                y = y + 1;
                break;
            case 'D':
                y = y - 1;
                break;
            default:
                console.log('Invalid direction');
                break;
        }
        coords.push([x,y]);
    }
    return coords;
}

function getCoordsWire(wire) {
    const instructions = getInstructions(wire);
    let currentCoords = [0, 0];
    let coordsWire = []
    for (instruction of instructions) {
        const coords = getCoordsInstruction(currentCoords, instruction);
        currentCoords = coords[coords.length-1];
        coordsWire = [...coordsWire, ...coords];
    }
    return coordsWire;
}

function cleanRepeatedCoords(wire) {
    const coords = getCoordsWire(wire);
    return coords.reduce((obj, item) => {
        if (!obj[item]) {
            obj[item] = 0;
        }
        return obj;
    }, {});
}

function getIntersectionCoords(wireA, wireB) {
    const obj = {};
    const intersectionCoords = [];

    for (key in wireA) {
        if (!obj[key]) {
            obj[key] = 0;
        }
        obj[key]++;
    }
    for (key in wireB) {
        if (!obj[key]) {
            obj[key] = 0;
        }
        obj[key]++;
    }
    for (key in obj) {
        if (obj[key] > 1) intersectionCoords.push(key);
    }
    return intersectionCoords;
}

function getManhattanDistance(intersectionPoint) {
    let [x, y] = intersectionPoint.split(',');
    x = Math.abs(+x);
    y = Math.abs(+y);
    return x + y;
}

function solutionPartOne() {
    const coordsA = cleanRepeatedCoords(instructionsWireA);
    const coordsB = cleanRepeatedCoords(instructionsWireB);
    const intersections = getIntersectionCoords(coordsA, coordsB);
    const manhattanDistance  = intersections.map(point => getManhattanDistance(point));
    
    return Math.min(...manhattanDistance);
}

function stepsIntersectionPoint(coords, point) {
    return coords.findIndex(el => {
        let [x,y] = point.split(',');
        x = +x;
        y = +y;
        const [elX,elY] = el;
        return elX === x && elY === y;
    }) + 1;
}

function getSignalDelay(wireA, wireB, point){
    return stepsIntersectionPoint(wireA, point) + stepsIntersectionPoint(wireB, point);
}

function getMinSignalDelay(wireA, wireB) {
    const coordsA = cleanRepeatedCoords(instructionsWireA);
    const coordsB = cleanRepeatedCoords(instructionsWireB);
    const intersections = getIntersectionCoords(coordsA, coordsB);
    const distances = intersections.map(point => getSignalDelay(wireA, wireB, point));
    return Math.min(...distances);
}

function solutionPartTwo() {
    const coordsA = getCoordsWire(instructionsWireA);
    const coordsB = getCoordsWire(instructionsWireB);
    return getMinSignalDelay(coordsA, coordsB);
}

// Solution part 1
//console.log(solutionPartOne());

// Solution part 2
console.log(solutionPartTwo())


