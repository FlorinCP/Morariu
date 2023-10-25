/**
 * Functie pentru a descarca fiserul cu puncte
 *
 * @param points
 */
export function downloadFile(points) {
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