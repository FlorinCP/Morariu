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

/**
 * Alegem un punct random
 * Pentru fiecare neuron calculam distanta Euclidiana dintre el si punct
 *
 *
 * @param point punctul ales random
 * @param neuroni lista cu neuronii
 * @return {*[]}
 */
export function computeDistanceNeuroni(point, neuroni) {
  const distanceArray = [];
  neuroni.forEach((neuron, index) => {
    distanceArray[index] = calculateEuclideanDistance(point, neuron);
  });

  const indexOfMin = distanceArray.indexOf(Math.min(...distanceArray));
  const closestNeuron = neuroni[indexOfMin];
  return closestNeuron;
}

/**
 * Functie pentru a alege un punct random
 *
 * @param length lungimea vectorului de puncte
 * @return {number}
 */
export function getRandomPointIndex(length) {
  const min = 0;
  const max = length;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *Functie pentru a returna o lista cu neuronii din vecinatate
 *
 * @param closestNeuron neuronul in jurul caruia calculam vecinatatea
 * @param neuroni lista cu toti neuronii
 * @param vecinatate coeficientul de vecinatate
 * @return {*[]}
 */
export function getCloseNeurons(closestNeuron, neuroni, vecinatate) {
  const vecinatateCoeficinet = Math.round(vecinatate);
  const closestNeuronCoords = closestNeuron.matrixCoord;

  const vicinityArray = generalVicinity(
    closestNeuronCoords,
    vecinatateCoeficinet,
    neuroni,
  );

  return getNeuroniVecini(neuroni, vicinityArray);
}

/**
 * Pentru fiecare neuron verifica daca in lista de coordonate se afla coordonatele sale din .matrixCoord
 *
 * @param neuroni lista de neuroni
 * @param coords lista de coordonate
 * @return {*[]}
 */
function getNeuroniVecini(neuroni, coords) {
  const intermediateNeuronsArray = [];

  neuroni.forEach((neuron) => {
    const temp = coords.find(
      (coord) =>
        coord.row === neuron.matrixCoord.row &&
        coord.col === neuron.matrixCoord.col,
    );
    if (temp) {
      intermediateNeuronsArray.push(neuron);
    }
  });
  return intermediateNeuronsArray;
}

/**
 * Functie pentru a returna lista neuroniilor apropiati
 *
 * @param closestNeuronCoords coordonatele neuronuli in jurul caruia se realizeaza vecinatatea
 * @param level gradul de vecinatate
 * @param neuroni lista totala de neuroni
 * @return {*[]}
 */
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

function assignMatrixCoordsToNeuron(neuroni) {
  const width = Math.sqrt(neuroni.length);
  neuroni.forEach((neuron, index) => {
    neuron.matrixCoord = { row: Math.floor(index / width), col: index % width };
  });

  console.log(neuroni);
}

/**
 * Fumctio lui Kohonen
 *
 * @param vecinatate
 * @param coeficientInvatare
 * @param point
 * @param neuron
 * @return {*}
 * @constructor
 */
function kohonenFormula(vecinatate, coeficientInvatare, point, neuron) {
  const newCoords = { newX: null, newY: null };

  newCoords.newX = neuron.x + coeficientInvatare * (point.x - neuron.x);
  newCoords.newY = neuron.y + coeficientInvatare * (point.y - neuron.y);

  neuron.x = newCoords.newX;
  neuron.y = newCoords.newY;

  return neuron;
}

/**
 * Functia ce aplica pe fiecare neuron vecin formula lui Kohonen
 *
 * @param point punctul ales random
 * @param neuroniVecini neuronii vecini ai neuronului cel mai apropiat de puncul ales random
 * @param vecinatate coeficientul de vecinatate
 * @param coeficientInvatare
 * @return {*[]}
 */
export function getNewNeuroni(
  point,
  neuroniVecini,
  vecinatate,
  coeficientInvatare,
) {
  const intermediateArray = [];
  neuroniVecini.forEach((neuron) => {
    let result;
    result = kohonenFormula(vecinatate, coeficientInvatare, point, neuron);
    intermediateArray.push(result);
  });

  return intermediateArray;
}

export function replaceNeuroni(oldNeuroni, newNeuroni) {
  const duplicatesNeuroni = oldNeuroni.concat(newNeuroni)
  const uniqueNeuroni = [...new Set(duplicatesNeuroni)]

  return uniqueNeuroni;
}
