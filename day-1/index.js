const fs = require('fs');

const freqInput = fs.readFileSync('./frequency-input.csv', {
  encoding: 'utf8'
});

const freqChanges = freqInput.split('\n').map(freqChange => +freqChange);

const sum = freqChanges.reduce((sum, freqChange) => sum + freqChange, 0);
console.log('​sum: ', sum);

const freqResults = [];
let lastFreqResult = 0;
let duplicateFreqFound = false;
for (let i = 0; !duplicateFreqFound; i++) {
  if (i >= freqChanges.length) {
    i = 0;
  }
  const currentFreqChange = freqChanges[i];
  lastFreqResult += currentFreqChange;
  if (freqResults.includes(lastFreqResult)) {
    duplicateFreqFound = true;
  }
  freqResults.push(lastFreqResult);
}
console.log('duplicate frequency: ', lastFreqResult);
