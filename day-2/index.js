const fs = require('fs');
const path = require('path');

const boxIdsInput = fs.readFileSync(path.resolve(__dirname, 'box-ids.csv'), {
  encoding: 'utf8'
});

const boxIds = boxIdsInput.split('\n').sort();

// Part 1 - checksum

let idsWithTwoLettersCount = 0;
let idsWithThreeLettersCount = 0;
boxIds.forEach((boxId) => {
  const boxIdLetterCount = generateLetterCount(boxId);
  if (Object.values(boxIdLetterCount).includes(2)) {
    idsWithTwoLettersCount++;
  }
  if (Object.values(boxIdLetterCount).includes(3)) {
    idsWithThreeLettersCount++;
  }
});
const checksum = idsWithTwoLettersCount * idsWithThreeLettersCount;
console.log('checksum: ', checksum);

function generateLetterCount(input) {
  return input.split('').reduce((letterCount, letter) => {
    if (!letterCount[letter]) {
      letterCount[letter] = 0;
    }
    letterCount[letter]++;
    return letterCount;
  }, {});
}

// Part 2 - find 2 strings that are 1 letter apart in same location

for (let i = 0; i < boxIds.length - 1; i++) {
  const firstBoxId = boxIds[i];
  const secondBoxId = boxIds[i + 1];
  const differenceCount = stringDifferenceCount(firstBoxId, secondBoxId);
  if (differenceCount === 1) {
    console.log(`strings found: [${firstBoxId},${secondBoxId}]`);
    console.log('result: ', stringWithoutDifference(firstBoxId, secondBoxId));
    break;
  }
}

function stringWithoutDifference(firstInput, secondInput) {
  return firstInput.split('').reduce((result, letter, index) => {
    if (letter === secondInput[index]) {
      result += letter;
    }
    return result;
  }, '');
}

function stringDifferenceCount(firstInput, secondInput) {
  return firstInput.split('').reduce((differenceCount, letter, index) => {
    if (letter !== secondInput[index]) {
      differenceCount++;
    }
    return differenceCount;
  }, 0);
}
