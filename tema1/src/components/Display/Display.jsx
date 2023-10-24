import React, { useEffect, useState } from "react";
import style from "./Display.module.css";

function Display(props) {
  const [zoneCount, setZoneCout] = useState("");
  const [pointsCount, setPointsCount] = useState("");
  const [points, setPoints] = useState([]);
  const [centroizi, setCentroizi] = useState([]);

  function generateCoordinates() {
    const intermediatePoints = [];
    for (let i = 0; i < pointsCount; i++) {
      const zoneIndex = Math.floor(Math.random() * 3 + 1);
      console.log(zoneIndex);

      if (zoneIndex === 1) {
        const x = generateArea(180, -10);
        const y = generateArea(220, 10);
        intermediatePoints.push({ x: x, y: y, zone: 1 });
      } else if (zoneIndex === 2) {
        const x = generateArea(100, 5);
        const y = generateArea(110, 10);
        intermediatePoints.push({ x: x, y: y, zone: 2 });
      } else if (zoneIndex === 3) {
        const x = generateArea(210, 5);
        const y = generateArea(-150, 10);
        intermediatePoints.push({ x: x, y: y, zone: 3 });
      }
    }
    setPoints(intermediatePoints);
  }

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

  function G(x, m, sigma) {
    const exponent = -((m - x) ** 2) / (2 * sigma ** 2);
    return Math.exp(exponent);
  }

  function ourRandom(probabilityOfZero) {
    const random = Math.random();
    return random < probabilityOfZero ? 0 : random;
  }

  function getRandomPa() {
    return Math.min(1, ourRandom(0.0003) * 1.000000001);
  }

  function getRandomBetweenNegative300And300() {
    return Math.floor(Math.random() * (300 - -300 + 1)) - 300;
  }

  function assignZoneToPoints() {
    const intermediatePoints = [];
    for (let i = 0; i < pointsCount; i++) {
      const zoneIndex = Math.floor(Math.random() * 3) + 1;
      giveCoordinatesSwitch(zoneIndex, intermediatePoints);
    }
    setPoints(intermediatePoints);
  }

  function giveCoordinatesSwitch(zoneIndex, someArray) {
    switch (zoneIndex) {
      case 1:
        someArray.push({
          x: Math.floor(Math.random() * (190 - 170 + 1)) + 170,
          y: Math.floor(Math.random() * (230 - 210 + 1)) + 210,
          zone: zoneIndex,
        });
        break;
      case 2:
        someArray.push({
          x: Math.floor(Math.random() * (-85 + 115 + 1)) - 85,
          y: Math.floor(Math.random() * (120 - 100 + 1)) + 100,
          zone: zoneIndex,
        });
        break;
      case 3:
        someArray.push({
          x: Math.floor(Math.random() * (215 - 205 + 1)) + 205,
          y: Math.floor(Math.random() * (170 - 130 + 1)) - 130,
          zone: zoneIndex,
        });
        break;
    }
  }

  function convertToScreenCoordinates(point, isKnown) {
    const screenWidth = 900; // for example
    const screenHeight = 900; // for example
    const dataMinX = -300; // adjust as needed
    const dataMaxX = 300; // adjust as needed
    const dataMinY = -300; // adjust as needed
    const dataMaxY = 300; // adjust as needed

    const screenX =
      ((point.x - dataMinX) / (dataMaxX - dataMinX)) * screenWidth;
    const screenY =
      screenHeight -
      ((point.y - dataMinY) / (dataMaxY - dataMinY)) * screenHeight; // Subtract from screenHeight to flip the Y axis if necessary

    let color;
    if (isKnown) {
      color = getPointColor(point.zone);
    } else {
      color = "black";
    }

    return { x: screenX, y: screenY, color: color };
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
    }
  }

  function downloadFile() {
    const data = JSON.stringify(points, null, 2);

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "points.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  function CoordinatePlotter({ dataPoints, isKnown, centroizi }) {
    return (
      <div className={style.plotArea}>
        <div className={style.xAxis}></div>
        <div className={style.yAxis}></div>

        {dataPoints.map((point, index) => {
          const screenPoint = convertToScreenCoordinates(point, isKnown);
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${screenPoint.x}px`,
                top: `${screenPoint.y}px`,
                width: "1px",
                height: "1px",
                backgroundColor: `${screenPoint.color}`,
                transform: "translate(-50%, -50%)", // Center the div on the coordinate
              }}
            ></div>
          );
        })}
        {centroizi &&
          centroizi.map((point, index) => {
            const screenPoint = convertToScreenCoordinates(point, !isKnown);
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${screenPoint.x}px`,
                  top: `${screenPoint.y}px`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: `orange`,
                  border: "1px solid red",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
              ></div>
            );
          })}
      </div>
    );
  }

  function genereazaCentroizi() {
    const centroiziCount = Math.floor(Math.random() * 9 + 2);
    const centroiziArray = [];

    for (let i = 0; i < centroiziCount; i++) {
      centroiziArray.push({
        x: getRandomBetweenNegative300And300(),
        y: getRandomBetweenNegative300And300(),
        id: i,
        // zone: Math.floor(Math.random()*7 +3)
      });
    }

    setCentroizi(centroiziArray);
  }
  function calculateEuclideanDistance(point1, point2) {
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
  const computeDistance = () => {
    const intermediatePoints = points;

    intermediatePoints.forEach((point) => {
      const distanceArray = [];
      centroizi.forEach((centroid, index) => {
        distanceArray[index] = calculateEuclideanDistance(point, centroid);
      });

      point.centroid = distanceArray.indexOf(Math.min(...distanceArray)) + 1;
    });

    const valueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    intermediatePoints.forEach((point) => {
      valueArray[point.centroid - 1] = valueArray[point.centroid - 1] + 1;
    });

    setPoints(intermediatePoints);
    console.log(valueArray);

    return valueArray;
  };

  function computeCentrulDeGreutate() {
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

    setCentroizi(centroziiArray);
  }

  useEffect(() => {
    if (centroizi) {
      console.log(" centroizii sunt ", centroizi);
    }
  }, [centroizi]);

  useEffect(() => {
    if (points) {
      console.log(points);
    }
  }, [points]);

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
          <button onClick={generateCoordinates}>
            Genereaza zona cu zgomot
          </button>
        </div>
        <button onClick={assignZoneToPoints}>Genereaza</button>
        <button onClick={downloadFile}>Descarca fisierul</button>
      </div>
      <CoordinatePlotter dataPoints={points} isKnown={true} />
      <div className={style.header}>
        <div>
          <button onClick={genereazaCentroizi}>Genereaza centroizi</button>
        </div>
        <div>
          <button onClick={computeDistance}>Calculeaza distanta</button>
        </div>
        <div>
          <button onClick={computeCentrulDeGreutate}>
            Calculeaza centrul de greutate
          </button>
        </div>
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
