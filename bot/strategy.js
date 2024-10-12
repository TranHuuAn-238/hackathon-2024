function randomMove(directions)
{
    return directions[Math.floor(Math.random() * directions.length)];   
}

module.exports = {
    randomMove
};