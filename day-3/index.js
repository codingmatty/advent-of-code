const fs = require('fs');
const path = require('path');

const fabricInput = fs.readFileSync(
  path.resolve(__dirname, 'fabric-input.txt'),
  {
    encoding: 'utf8'
  }
);

const fabricCuts = fabricInput.split('\n').map(fabricCut => {
  const [
    ,
    id,
    startX,
    startY,
    width,
    height
  ] = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/.exec(fabricCut);
  return {
    id,
    startX: +startX,
    startY: +startY,
    width: +width,
    height: +height
  };
});

const fullFabric = Array.from(Array(1000)).map(() =>
  Array.from(Array(1000)).map(() => [])
);

fabricCuts.forEach(({ id, startX, startY, width, height }) => {
  for (let x = startX; x < startX + width; x++) {
    for (let y = startY; y < startY + height; y++) {
      fullFabric[x][y].push(id);
    }
  }
});

let overlapCount = 0;
for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    if (fullFabric[x][y].length > 1) {
      fullFabric[x][y].length = 0; // clear the overlap
      overlapCount++;
    }
  }
}

fabricCuts.forEach(({ id, startX, startY, width, height }) => {
  let coveredFabricCount = 0;
  for (let x = startX; x < startX + width; x++) {
    for (let y = startY; y < startY + height; y++) {
      if(fullFabric[x][y].includes(id)) {
        coveredFabricCount++;
      }
    }
  }
  if (coveredFabricCount === width * height) {
    console.log('Singular found ID: ', id);
  }
});

console.log('​overlapCount', overlapCount);
