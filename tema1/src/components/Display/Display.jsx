import React, { useEffect, useRef, useState } from "react";
import style from "./Display.module.css";
import CoordinatePlotter from "../CoordinatePlotter/CoordinatePlotter.jsx";
import {generateCoordinates} from "../../functions/generateCoordinates.js";
import {downloadFile} from "../../functions/fileFunctions.js";
import {
  computeCentrulDeGreutate,
  computeCostFunction,
  computeDistance,
  genereazaCentroizi
} from "../../functions/generateCentroizi.js";
import {part1, part2, part2_1, part3} from "../../functions/experimentalFunctions.js";

function Display(props) {

  const [zoneCount, setZoneCout] = useState("");
  const [pointsCount, setPointsCount] = useState("");
  const [points, setPoints] = useState([]);
  const [centroizi, setCentroizi] = useState([]);
  const [suma,setSuma] = useState()
  const [valueArray,setValueArray] = useState([])

  const handleGenerarePuncte = () =>{
    const intermediatePoints = generateCoordinates(pointsCount)
    setPoints(intermediatePoints)
  }

  const handleGenerareCentroizi = () =>{
    const centroiziArray = genereazaCentroizi()
    setCentroizi(centroiziArray)
  }

  const handleComputeDistance = () =>{
    const pointsAssignedToCentroids = computeDistance(points,centroizi)
    setPoints(pointsAssignedToCentroids)
  }

  const handleComputeCentrulDeGreutate = () =>{
    const centroiziModificati = computeCentrulDeGreutate(points,centroizi)
    const { sum, valueArray } = computeCostFunction(centroiziModificati, points);
    setCentroizi(centroiziModificati)
    setSuma(sum)
    setValueArray(valueArray)
  }

  useEffect(() => {
    if (valueArray){
      console.log(valueArray)
    }
  }, [valueArray]);

  function ruleazaAutomat() {
    let intermediatePoints = points;
    let centroiziArray = centroizi;
    let sum = suma;
    let prevSum = 0;
    let iterations = 0;
    let cont;
    let somePoints = [];
    let centreDeGreutate;

    do {
      if (iterations === 0) {
        somePoints = part1(intermediatePoints,centroiziArray);
      } else {
        somePoints = part1(somePoints,centroiziArray);
      }

      centreDeGreutate = part2(somePoints,centroiziArray);
      centroiziArray = part2_1(centreDeGreutate, centroiziArray);
      sum = part3(centroiziArray,somePoints);

      console.log("sum ", sum, "prevSum ", prevSum);
      if (sum !== prevSum) {
        cont = true;
      } else {
        cont = false;
      }
      iterations++;
      prevSum = sum;
      console.log(iterations);
    } while (cont && iterations < 100);

    setPoints(somePoints)
    setIterations(iterations + 1)
    setCentroizi(centroiziArray);
  }

  function getPointColor(pointZone) {
    switch (pointZone) {
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "green";
      case 4:
        return "orange";
      case 5:
        return "pink";
      case 6:
        return "slategray";
      case 7:
        return "pink";
      case 8:
        return "yellow";
      default:
        return "black";
    }
  }

  const [iterations,setIterations] = useState()

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div>
          <p>Cate zone sa avem ? </p>
          <input
            disabled={true}
            type="text"
            value={zoneCount}
            onChange={(e) => setZoneCout(e.target.value)}
          />
          <p>Entered Value: {zoneCount}</p>
        </div>
        <div>
          <p>Cate puncte sa avem in total? </p>
          <input
            type="text"
            value={pointsCount}
            onChange={(e) => setPointsCount(e.target.value)}
          />
          <p>Entered Value: {pointsCount}</p>
        </div>
        <div>
          <button onClick={handleGenerarePuncte}>
            Genereaza zona cu zgomot
          </button>
        </div>
        <button onClick={()=>downloadFile(points)}>Descarca fisierul</button>
      </div>
      <CoordinatePlotter dataPoints={points} isKnown={true} />
      <div className={style.header}>
        <div>
          <button onClick={handleGenerareCentroizi}>Genereaza centroizi</button>
        </div>
        <div>
          <button onClick={handleComputeDistance}>
            Calculeaza distanta
          </button>
        </div>
        <div>
          <button
            onClick={handleComputeCentrulDeGreutate}
          >
            Calculeaza centrul de greutate
          </button>
        </div>
        <div>
          <button onClick={ruleazaAutomat}>Ruleaza Automat</button>
        </div>
        <div>{iterations}</div>
      </div>
      <div>
        {
          centroizi.map((centroid, index) => (
              <div key={index} className={style.centroidInfo} style={{backgroundColor: getPointColor(centroid.id + 1)}}>
                centroid {index + 1}{" "} { ""}
              </div>
          ))
        }
      </div>
      <CoordinatePlotter
        dataPoints={points}
        isKnown={false}
        centroizi={centroizi}
      />
    </div>
  );
}

export default Display;
