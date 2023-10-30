import React from "react";
import style from "../Display/Display.module.css";

function CoordinatePlotter({ dataPoints, isKnown, centroizi }) {
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
      color = point.centroid ? getPointColor(point.centroid) : "black";
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
      default:
        return "black";
    }
  }

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
            >
              <div className={style.info} style={{color: getPointColor(point.id + 1)}}>{point.id + 1}</div>
            </div>
          );
        })}
    </div>
  );
}

export default CoordinatePlotter;
