import React from "react";
import style from "../Display/Display.module.css";
import {getPointColor} from "../../functions/getPointColor.js";
import {convertToScreenCoordinates} from "../../functions/generateCoordinates.js";

function CoordinatePlotter({ dataPoints, isKnown, neuroni }) {

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
                backgroundColor: `black`,
                transform: "translate(-50%, -50%)", // Center the div on the coordinate
              }}
            ></div>
          );
        })}
        {neuroni &&
          neuroni.map((point, index) => {
            const screenPoint = convertToScreenCoordinates(point, !isKnown);
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${screenPoint.x}px`,
                  top: `${screenPoint.y}px`,
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: `red`,
                  // border: "1px solid red",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
              >
                <div
                  className={style.info}
                  style={{ color: "black" }}
                >
                  {point.id + 1}
                </div>
              </div>
            );
          })}
      </div>
  );
}

export default CoordinatePlotter;
