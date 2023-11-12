/**
 *Function for returning an array with neurons
 *
 * @param neuroniCount
 * @return {*[]}
 */
export function generateNeuroni(neuroniCount) {
  const neuroniArray = [];
  const positionsArray = generateCoordonatesInterval(neuroniCount);
  let id = 0; // de ce daca pun 1 incepe de la 2 ???

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
