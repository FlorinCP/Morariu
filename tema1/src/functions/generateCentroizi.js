import {getRandomBetweenNegative300And300} from "./generateCoordinates.js";

/**
 * Functie folosita pentru generarea centroiziilor
 *
 * @return {*[]}
 */
export function genereazaCentroizi() {
    const centroiziCount = Math.floor(Math.random() * 9 + 2);
    const centroiziArray = [];

    for (let i = 0; i < centroiziCount; i++) {
        centroiziArray.push({
            x: getRandomBetweenNegative300And300(),
            y: getRandomBetweenNegative300And300(),
            id: i,
        });
    }

    return [...centroiziArray]
}

/**
 *
 * Functie folosita pentru a putea atribuii fiecarui punct cate un centroid in functie de o metrica aleasa
 * in cazul nostru distanta euclidiana
 *
 * @param points
 * @param centroizi
 * @return {*}
 */
export const computeDistance = (points,centroizi) => {
    const intermediatePoints = points;

    intermediatePoints.forEach((point) => {
        const distanceArray = [];
        centroizi.forEach((centroid, index) => {
            distanceArray[index] = calculateEuclideanDistance(point, centroid);
        });

        point.centroid = distanceArray.indexOf(Math.min(...distanceArray)) + 1;
    });

    return [...intermediatePoints];
};

/**
 * Calculara distantei euclidiene
 *
 * @param point1
 * @param point2
 * @return {number}
 */
export function calculateEuclideanDistance(point1, point2) {
    if (!point1 || !point2) {
        throw new Error("Both points are required!");
    }

    // Destructure the coordinates from the points
    const { x: x1, y: y1 } = point1;
    const { x: x2, y: y2 } = point2;

    // Calculate the differences between corresponding coordinates
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Calculate the Euclidean distance using the Pythagorean theorem
    return Math.sqrt(dx * dx + dy * dy);
}

export function computeCentrulDeGreutate(points,centroizi) {
    const valueArray = [
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
        { x: 0, y: 0, count: 0 },
    ];

    points.forEach((point) => {
        const x = valueArray[point.centroid - 1].x;
        const y = valueArray[point.centroid - 1].y;
        const count = valueArray[point.centroid - 1].count;
        valueArray[point.centroid - 1] = {
            x: x + point.x,
            y: y + point.y,
            count: count + 1,
        };
    });

    const filteredArray = valueArray.filter((elem) => elem.x && elem.y !== 0);

    const centreDeGreutate = filteredArray.map((point) => {
        const x = point.x / point.count;
        const y = point.y / point.count;
        return {
            x: x,
            y: y,
        };
    });

    console.log(centreDeGreutate);

    const centroziiArray = [];
    centroizi.forEach((centroid, index) => {
        const id = centroid.id;

        centroziiArray.push({
            id: id,
            x: centreDeGreutate[index].x,
            y: centreDeGreutate[index].y,
        });
    });

    return [...centroziiArray];
}

/**
 * Calculeaza costul unei epoci
 *
 * @param centroizi
 * @param points
 * @return {any}
 */
export function computeCostFunction(centroizi,points) {
    const valueArray = new Array(centroizi.length);

    centroizi.forEach((centroid) => {
        valueArray[centroid.id] = points.filter(
            (point) => point.centroid === centroid.id + 1,
        );
    });

    const suma = new Array(centroizi.length).fill(0);

    for (let i = 0; i < valueArray.length; i++) {
        valueArray[i].forEach((point) => {
            suma[i] = suma[i] + calculateEuclideanDistance(point, centroizi[i]);
        });
    }

    const sum = suma.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );

    return {
        sum : sum,
        valueArray : valueArray
    }
}