const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'input.txt');

const puzzleInput = fs.readFileSync(pathFile, 'utf-8')
    .split('')
    .map(el => +el);

function getLayers(image, height, width) {
    const imageSize = height * width;
    const layers = [];
    for (let i = 0; i < image.length; i += imageSize) {
        layers.push(puzzleInput.slice(i, i + imageSize));
    }
    return layers;
}

function countDigit(arr, digit) {
    return arr.filter(el => el === digit).length;
}

function mapImageColors(layer, emptyImage) {
    layer.forEach((el, index) => {
        if (emptyImage[index] === undefined || emptyImage[index] === 2) {
            emptyImage[index] = el;
        }
    });
}

function formatImage(image) {
    let format = '';
    for (let i = 0; i < 150; i+=25) {
        format += `${image.slice(i, i + 25).join('')}\n`;
    }
    return format.replace(/0/g,' ');
}

// Solution part 1
function solutionPartOne() {
    const layers = getLayers(puzzleInput, 6, 25);
    const layerLessZero = layers.map((el, index) => {
        return {
            size: countDigit(el, 0),
            index,
        }
    }).sort((a, b) => a.size - b.size)[0];
    const countDigit1 = countDigit(layers[layerLessZero.index], 1);
    const countDigit2 = countDigit(layers[layerLessZero.index], 2);
    return countDigit1 * countDigit2;
}
console.log('Solution part 1:', solutionPartOne());

// Solution part 2
function solutionPartTwo() {
    const layers = getLayers(puzzleInput, 6, 25);
    const image = new Array(150);

    layers.forEach(el => mapImageColors(el, image));
    return formatImage(image);
}
console.log('Solution part 2:\n', solutionPartTwo())




