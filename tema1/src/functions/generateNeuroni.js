import { calculateEuclideanDistance } from "./generateCentroizi.js";

/**
 *Function for returning an array with neurons
 *
 * @param neuroniCount
 * @return {*[]}
 */
export function generateNeuroni(neuroniCount) {
  const neuroniArray = [];
  const positionsArray = generateCoordonatesInterval(neuroniCount);
  let id = 0;

  for (let i = 0; i < positionsArray.length; i++) {
    for (let j = 0; j < positionsArray.length; j++) {
      neuroniArray.push({
        x: positionsArray[j],
        y: positionsArray[i],
        id: id,
      });
      id++;
    }
  }

  assignMatrixCoordsToNeuron(neuroniArray);


  return [...neuroniArray];
}

/**
 * Function for generate coordonates interval
 *
 * @param neuroniCount
 * @return {*[]}
 */
function generateCoordonatesInterval(neuroniCount) {
  const positionsArray = [];
  const start = -300;
  const end = 300;
  const count = Math.sqrt(neuroniCount);
  const step = (end - start) / (count - 1);

  for (let i = 0; i <= count - 1; i++) {
    const value = start + i * step;
    positionsArray.push(value);
  }

  console.log(
    positionsArray.length,
    " lungimea vectorului de pozitii",
    positionsArray,
  );

  return [...positionsArray];
}

export function coeficinetInvatare(epocaCurenta, epociDorite) {
  const exponent = -epocaCurenta / epociDorite;
  return 0.7 * Math.exp(exponent);
}

export function vecinatateFunction(epocaCurenta, epociDorite) {
  const exponent = -epocaCurenta / epociDorite;
  return 6.1 * Math.exp(exponent);
}

export function computeDistanceNeuroni(points, neuroni) {
  const intermediatePoints = points;
  const point = intermediatePoints[getRandomPoint(intermediatePoints.length)];

  const distanceArray = [];
  neuroni.forEach((neuron, index) => {
    distanceArray[index] = calculateEuclideanDistance(point, neuron);
  });

  const indexOfMin = distanceArray.indexOf(Math.min(...distanceArray));
  const closestNeuron = neuroni[indexOfMin];

  return [closestNeuron, point];
}

function getRandomPoint(length) {
  const min = 0;
  const max = length;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCloseNeurons(closestNeuron, neuroni, vecinatate) {
  const vecinatateCoeficinet = Math.round(vecinatate);
  const closestNeuronCoords = closestNeuron.matrixCoord;

  

}

function transformToMatrix(array) {
  const length = Math.sqrt(array.length);
  const result = [];
  let index = 0;

  for (let i = 0; i < length; i++) {
    const row = [];
    for (let j = 0; j < length; j++) {
      row.push(array[index]);
      index++;
    }
    result.push(row);
  }

  return result;
}

function assignMatrixCoordsToNeuron(neuroni) {
  const width = Math.sqrt(neuroni.length);
  neuroni.forEach((neuron, index) => {
    neuron.matrixCoord = { row: Math.floor(index / width), col: index % width };
  });

  console.log(neuroni);
}
