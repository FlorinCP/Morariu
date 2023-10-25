/**
 *
 * Generam punctele de lucru in functie de cate zone avem si respectand formula lui Gauss
 *
 * @param pointsCount
 * @return {*[]}
 */
export function generateCoordinates(pointsCount) {

    // Aici putem adauga mai multe zone dupa bunul plac
    const zonesConfig = [
        { xRange: [180, -10], yRange: [220, 10], zone: 1 },
        { xRange: [100, 5], yRange: [110, 10], zone: 2 },
        { xRange: [210, 5], yRange: [-150, 10], zone: 3 },
    ];

    const intermediatePoints = [];

    for (let i = 0; i < pointsCount; i++) {
        const zoneIndex = Math.floor(Math.random() * zonesConfig.length);
        const selectedZone = zonesConfig[zoneIndex];

        const x = generateArea(...selectedZone.xRange);
        const y = generateArea(...selectedZone.yRange);

        intermediatePoints.push({ x, y, zone: selectedZone.zone });
    }

    return intermediatePoints;
}

/**
 * functia propriu zisa de generare a unui coordonat al punctului
 *
 * @param m
 * @param sigma
 * @return {*}
 */
function generateArea(m, sigma) {
    let trust;
    let x;
    let Pb;
    do {
        x = getRandomBetweenNegative300And300();
        trust = G(x, m, sigma);
        Pb = getRandomPa();
    } while (Pb > trust);

    return x;
}


/**
 * Functia lui Gauss
 *
 * @param x
 * @param m
 * @param sigma
 * @return {number}
 * @constructor
 */
function G(x, m, sigma) {
    const exponent = -((m - x) ** 2) / (2 * sigma ** 2);
    return Math.exp(exponent);
}

/**
 * Functie random pe intervalul -300/300
 *
 * @return {number}
 */
export function getRandomBetweenNegative300And300() {
    return Math.floor(Math.random() * (300 - -300 + 1)) - 300;
}

/**
 * Functie random pentru a putea alege un numar intre 0 si 1 cu sanse crescute de 0
 *
 * @return {number}
 */
function getRandomPa() {
    return Math.min(1, ourRandom(0.0003) * 1.000000001);
}

/**
 * Functie random custom pentru a favoriza aparitia zgomotului
 *
 * @param probabilityOfZero
 * @return {number|number}
 */
function ourRandom(probabilityOfZero) {
    const random = Math.random();
    return random < probabilityOfZero ? 0 : random;
}