let arrayPermutations = [];
let usedChars = [];

function permute(input) {
  let ch;
  for (let i=0; i<input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length === 0) {
      arrayPermutations.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return arrayPermutations;
};

function permutations(input) {
  arrayPermutations = [];
  usedChars = [];
  return permute(input);
}

module.exports = {
  permutations
}
