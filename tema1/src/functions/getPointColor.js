export function getPointColor(pointZone) {
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