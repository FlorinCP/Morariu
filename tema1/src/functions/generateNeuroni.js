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

  const vicinityArray = generalVicinity(
    closestNeuronCoords,
    vecinatateCoeficinet,
    neuroni,
  );

  const neuroniVecini = getNeuroniVecini(neuroni, vicinityArray);

  return neuroniVecini
}

function getNeuroniVecini(neuroni, coords) {
  const intermediateArray = [];

  neuroni.forEach((neuron) => {
    const temp = coords.find(
      (coord) =>
        coord.row === neuron.matrixCoord.row &&
        coord.col === neuron.matrixCoord.col,
    );
    if (temp) {
      intermediateArray.push(neuron);
    }
  });
  return intermediateArray;
}

function generalVicinity(closestNeuronCoords, level, neuroni) {
  const width = Math.sqrt(neuroni.length);
  const x = closestNeuronCoords.row;
  const y = closestNeuronCoords.col;

  const generalLevelArray = [];

  for (
    let i = x - level < 0 ? 0 : x - level;
    i < (x + level > width ? width : x + level);
    i++
  ) {
    for (
      let j = y - level < 0 ? 0 : y - level;
      j < (y + level > width ? width : y + level);
      j++
    ) {
      generalLevelArray.push({
        row: i,
        col: j,
      });
    }
  }

  return generalLevelArray;
}

function getLevel1Vicinity(closestNeuronCoords) {
  const level1VicinityArray = [];
  const x = closestNeuronCoords.row;
  const y = closestNeuronCoords.col;

  let sus = { x: x - 1, y: y };
  let jos = { x: x + 1, y: y };
  let stanga = { x: x, y: y - 1 };
  let dreapta = { x: x, y: y + 1 };
  let ss = { x: x - 1, y: y - 1 };
  let sj = { x: x + 1, y: y - 1 };
  let ds = { x: x - 1, y: y + 1 };
  let dj = { x: x + 1, y: y + 1 };

  level1VicinityArray.push(sus, jos, stanga, dreapta, sj, ss, ds, dj);

  return level1VicinityArray;
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

function Kohonen(vecinatate,coeficientInvatare,point,neuron){

  const newCoords = {newX:null,newY:null}

  newCoords.newX = neuron.x + coeficientInvatare*(point.x - neuron.x)
  newCoords.newY = neuron.y + coeficientInvatare*(point.y - neuron.y)

  neuron.x = newCoords.newX
  neuron.y = newCoords.newY

  return neuron
}

export function getNewNeuroni(point,neuroniVecini,vecinatate,coeficientInvatare){
  const intermediateArray = []
    neuroniVecini.forEach((neuron)=>{
     const result = Kohonen(vecinatate,coeficientInvatare,point,neuron)
      intermediateArray.push(result)
    })

  return intermediateArray
}

export function replaceNeuroni(oldNeuroni,newNeuroni){

  const intermediateNeuroni = []

  oldNeuroni.forEach((oldN)=>{
    newNeuroni.forEach((newN) =>{
      if (oldN.id === newN.id){
        intermediateNeuroni.push(newN)
      } else {
        intermediateNeuroni.push(oldN)
      }
    })
  })

  return intermediateNeuroni
}
