import {calculateEuclideanDistance} from "./generateCentroizi.js";

/**
 * functia calculeaza cel mai apropriat centroid de fiecare punct , centroid assignat fiecarui punct
 *
 * @param intermediatePoints
 * @param centroizi
 * @return {*}
 */
export function part1(intermediatePoints,centroizi) {
    const newArray = intermediatePoints.map((point) => {
        const distanceArray = [];
        centroizi.forEach((centroid, index) => {
            distanceArray[index] = calculateEuclideanDistance(point, centroid);
        });

        return {
            ...point,
            centroid: distanceArray.indexOf(Math.min(...distanceArray)) + 1,
        };
        // point.centroid = distanceArray.indexOf(Math.min(...distanceArray)) + 1;
    });

    console.log(newArray);
    console.log(newArray === intermediatePoints);

    return [...newArray];
}

/**
 * functia returneaza centroizii noi cu locatia actualizata
 *
 * @param intermediatePoints
 * @param centroizi
 * @return {*[]}
 */
export function part2(intermediatePoints,centroizi) {
    console.log(intermediatePoints);
    const valueArray = new Array(centroizi.length).fill({
        x: 0,
        y: 0,
        count: 0,
    });

    intermediatePoints.forEach((point) => {
        const x = valueArray[point.centroid - 1].x;
        const y = valueArray[point.centroid - 1].y;
        const count = valueArray[point.centroid - 1].count;
        valueArray[point.centroid - 1] = {
            x: x + point.x,
            y: y + point.y,
            count: count + 1,
        };
    });

    const centreDeGreutate = valueArray.map((point) => {
        const x = point.x / point.count;
        const y = point.y / point.count;
        return {
            x: x,
            y: y,
        };
    });

    return [...centreDeGreutate];
}

export function part2_1(centreDeGreutate, recievedCentroizi) {
    const centroziiArray = [];
    recievedCentroizi.forEach((centroid, index) => {
        const id = centroid.id;

        centroziiArray.push({
            id: id,
            x: centreDeGreutate[index].x,
            y: centreDeGreutate[index].y,
        });
    });

    return centroziiArray;
}


/**
 * functia calculeaza energia
 *
 * @param centroziiArray
 * @param points
 * @return {any}
 */
export function part3(centroziiArray,points) {
    const valueArray2 = new Array(centroziiArray.length);

    centroziiArray.forEach((centroid) => {
        valueArray2[centroid.id] = points.filter(
            (point) => point.centroid === centroid.id + 1,
        );
    });

    const suma = new Array(centroziiArray.length).fill(0);

    for (let i = 0; i < valueArray2.length; i++) {
        console.log(valueArray2[i]);
        valueArray2[i].forEach((point) => {
            suma[i] = suma[i] + calculateEuclideanDistance(point, centroziiArray[i]);
        });
    }

    return suma.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
}