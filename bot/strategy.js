function randomMove(directions)
{
    return directions[Math.floor(Math.random() * directions.length)];   
}

// Calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

module.exports = {
    randomMove,
    calculateDistance
};