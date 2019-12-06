const inputA = 356261;
const inputB = 846303;

function biggerNextDigit(number) {
    const digits = number.toString().split('');
    return digits.reduce((acc, val, index, array) => 
        acc && array[index-1] <= val);
}

function equalsNextDigit(number) {
    const digits = number.toString().split('');
    return digits.reduce((acc, val, index, array) => {
        return acc || array[index+1] === val;
    }, false);
}

function validatePasswords(inputA, inputB) {
    const passwords = []
    for (let i= inputA; i<=inputB; i++) {
        if (biggerNextDigit(i) && equalsNextDigit(i)) {
            passwords.push(i);
        }
    }
    return passwords;
}

function solutionPartOne() {
    return validatePasswords(inputA, inputB).length;
}
// Solution part 1
console.log(solutionPartOne());

function validateTwoDigitsLong(number) {
    const digits = number.toString().split('');
    return digits.reduce((acc, val, index, array) => {
        if (index === array.length - 2) {
            return acc || (array[index+1] === val && array[index-1] !== val);
        }
        if (index === 0) {
            return acc || (array[index+1] === val && array[index+2] !== val);
        }
        return acc || (array[index+1] === val && array[index+2] !== val && array[index-1] !== val);
    }, false);
}

function solutionPartTwo() {
    let count = 0;
    const passwords = validatePasswords(inputA, inputB);
    passwords.forEach(el => {
        if (validateTwoDigitsLong(el)) {
            count++
        }
    })
    return count;
}
// Solution part 2
console.log(solutionPartTwo());
