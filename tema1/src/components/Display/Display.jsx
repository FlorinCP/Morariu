import React, { useEffect, useState } from "react";
import style from "./Display.module.css";
import CoordinatePlotter from "../CoordinatePlotter/CoordinatePlotter.jsx";
import { generateCoordinates } from "../../functions/generateCoordinates.js";
import { downloadFile } from "../../functions/fileFunctions.js";
import {
  computeCentrulDeGreutate,
  computeCostFunction,
  computeDistance,
  genereazaCentroizi,
} from "../../functions/generateCentroizi.js";
import {
  part1,
  part2,
  part2_1,
  part3,
} from "../../functions/experimentalFunctions.js";
import { getPointsFromFile } from "../../functions/readPointsFile.js";
import CoordinatePlotterCentroizi from "../CoordinatePlotter/CoordinatePlotterCentroizi.jsx";
import CoordinatePlotterNeuroni from "../CoordinatePlotter/CoordinatePlotterNeuroni.jsx";
import {
  coeficinetInvatare,
  computeDistanceNeuroni,
  generateNeuroni, getCloseNeurons, getNewNeuroni, getRandomPointIndex, replaceNeuroni, vecinatateFunction
} from "../../functions/generateNeuroni.js";

function Display(props) {
  const [zoneCount, setZoneCout] = useState("");
  const [pointsCount, setPointsCount] = useState("");
  const [points, setPoints] = useState([]);
  const [centroizi, setCentroizi] = useState([]);
  const [neuroni, setNeuroni] = useState([]);
  const [suma, setSuma] = useState();
  const [valueArray, setValueArray] = useState([]);
  const [epocaCurenta,setEpocaCurenta] = useState(1)
  const [epociDorite,setEpociDorite] = useState(10)
  const [vecinatate,setVecinatate] = useState()
  const [coeficientInvatare,setCoeficientInvatare] = useState()

  useEffect(() => {
      if (epocaCurenta !== null || epociDorite !== null){
        const vecinatateIntermediate = vecinatateFunction(epocaCurenta,epociDorite)
        console.log("vecinatatea ",vecinatateIntermediate)
        setVecinatate(vecinatateIntermediate)
        const coeficinetInvatareIntermediate = coeficinetInvatare(epocaCurenta,epociDorite)
        console.log("coeficientInvatare ",coeficinetInvatareIntermediate)
        setCoeficientInvatare(coeficinetInvatareIntermediate)
      }
  }, [epocaCurenta,epociDorite]);

  // useEffect for loading points from file
  useEffect(() => {
    if (points.length === 0) {
      getPointsFromFile().then((data) => {
        setPoints(data);
      });
    }
  }, [points]);

  const handleGenerarePuncte = () => {
    const intermediatePoints = generateCoordinates(pointsCount);
    setPoints(intermediatePoints);
  };

  const handleGenerareCentroizi = () => {
    const centroiziArray = genereazaCentroizi();
    setCentroizi(centroiziArray);
  };

  const handleComputeDistance = () => {
    const pointsAssignedToCentroids = computeDistance(points, centroizi);
    setPoints(pointsAssignedToCentroids);
  };

  /**
   * Calculeaza urmatoarea pozitie a neuroniilor
   *
   */
  const handleComputedistanceNeuroni = () =>{
    const randomPointIndex = getRandomPointIndex(points.length)
    const randomPoint = points[randomPointIndex]
    const closestNeuron = computeDistanceNeuroni(randomPoint,neuroni)

    console.log("neuronii vechi sunt : ",neuroni)
    const neuroniiVecini = getCloseNeurons(closestNeuron,neuroni,vecinatate)

    console.log("neuronii vecini ",neuroniiVecini)

    const newNeuroni = getNewNeuroni(randomPoint,neuroniiVecini,vecinatate,coeficientInvatare)
    const finalNeuroni =  replaceNeuroni(neuroni,newNeuroni)

    console.log("neuronii noi ",newNeuroni)
    console.log("neuronii finali", finalNeuroni)

    setNeuroni(finalNeuroni)
    setEpocaCurenta(prevState => prevState + 1)
  }

  /**
   *
   * iti pune neuronii pe harta
   */
  const handleNeuroni = () =>{
    const intermediateNeuroni = generateNeuroni(100);
     setNeuroni(intermediateNeuroni)
  }

  const handleComputeCentrulDeGreutate = () => {
    const centroiziModificati = computeCentrulDeGreutate(points, centroizi);
    const { sum, valueArray } = computeCostFunction(
      centroiziModificati,
      points,
    );
    setCentroizi(centroiziModificati);
    setSuma(sum);
    setValueArray(valueArray);
  };

  useEffect(() => {
    if (valueArray) {
      console.log(valueArray);
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
        somePoints = part1(intermediatePoints, centroiziArray);
      } else {
        somePoints = part1(somePoints, centroiziArray);
      }

      centreDeGreutate = part2(somePoints, centroiziArray);
      centroiziArray = part2_1(centreDeGreutate, centroiziArray);
      sum = part3(centroiziArray, somePoints);

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

    setPoints(somePoints);
    setIterations(iterations + 1);
    setCentroizi(centroiziArray);
  }

  const [iterations, setIterations] = useState();

  const [currentView, setCurrentView] = useState();

  function kMeansHeader() {
    return (
      <div className={style.header}>
        <div>
          <button onClick={handleGenerareCentroizi}>Genereaza centroizi</button>
        </div>
        <div>
          <button onClick={handleComputeDistance}>Calculeaza distanta</button>
        </div>
        <div>
          <button onClick={handleComputeCentrulDeGreutate}>
            Calculeaza centrul de greutate
          </button>
        </div>
        <div>
          <button onClick={ruleazaAutomat}>Ruleaza Automat</button>
        </div>
        <div>{iterations}</div>
      </div>
    );
  }

  function SOMHeader() {
    return (
      <div className={style.header}>
          <div className={style.flexInline}>
            <p>Cate epoci dorim ? </p>
            <input type="text" value={epociDorite} onChange={(e)=>setEpociDorite(e.target.value)}/>
            <p>{epociDorite}</p>
            <p>{epocaCurenta}</p>
          </div>
          <button onClick={handleNeuroni}>Genereaza neuroni</button>
          <button onClick={handleComputedistanceNeuroni} >Calculeaza distanta</button>
      </div>
    );
  }

  function kMeansDisplay() {
    return (
      <>
        <CoordinatePlotterCentroizi
          dataPoints={points}
          isKnown={false}
          centroizi={centroizi}
        />
      </>
    );
  }

  function SOMDisplay() {
    return (
      <>
        <CoordinatePlotterNeuroni
          dataPoints={points}
          isKnown={false}
          neuroni={neuroni}
        />
      </>
    );
  }

  function setCurrentHeader() {
    switch (currentView) {
      case "kMeans":
        return kMeansHeader();
      case "SOM":
        return SOMHeader();
    }
  }

  function showCurrentView() {
    switch (currentView) {
      case "kMeans":
        return kMeansDisplay();
      case "SOM":
        return SOMDisplay();
    }
  }

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
        <button onClick={() => downloadFile(points)}>Descarca fisierul</button>
      </div>

      <CoordinatePlotter dataPoints={points} isKnown={true} />

      <div className={style.header2}>
        <div className={style.choice}>
          <button onClick={() => setCurrentView("kMeans")}>K-Means</button>
          <button onClick={() => setCurrentView("SOM")}>SOM</button>
        </div>
        {setCurrentHeader()}
      </div>

      {showCurrentView()}
    </div>
  );
}

export default Display;
