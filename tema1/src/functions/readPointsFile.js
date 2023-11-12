import pointsFile from "../files/points.txt";

export const getPointsFromFile = async () => {
    return fetch(pointsFile)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Something failed");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error reading file: " + error);
            throw error;
        });
};
