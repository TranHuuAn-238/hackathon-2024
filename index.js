const io = require('socket.io-client');
const { randomMove } = require('./bot/strategy');

// Config socket
const SOCKET_SERVER_ADDR = process.env.SOCKET_SERVER || 'wss://your-socket-server.com:port';
const TOKEN = process.env.TOKEN || 'your_token_here';

// Const
const tankName = 'Sr0m';

// Create socket connect
const socket = io(SOCKET_SERVER_ADDR, {
    auth: {
        token: TOKEN
    }
});

// Join
socket.on('connect', () => {
    socket.emit('join', {});
    console.log('Connected to server!');
});


socket.on('user', (data) => {
    // const map = data.map;
    // const tank = data.tanks;
    const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    let previousPosition = { x: null, y: null };
    let moveInterval;
    let currentDirection = randomMove(directions);

    function emitMove(direction) {
        socket.emit('move', { orient: direction });
    }

    function startMoving() {
        // Clear old interval if exists
        if (moveInterval) {
            clearInterval(moveInterval);
        }

        // New interval
        moveInterval = setInterval(() => {
            emitMove(currentDirection);
        }, 17); // 17ms
    }
    function changeDirection() {
        let newDirection;
        do {
            newDirection = randomMove(directions);
        } while (newDirection === currentDirection);
    
        currentDirection = newDirection;
        startMoving(); // Restart the movement with the new direction
    }

    socket.on('player_move', (data) => {
        if (data.name === tankName) {
            // Bot not move, bot stuck
            if (previousPosition.x === data.x && previousPosition.y === data.y) {
                changeDirection();
            }
    
            // Update previous position
            previousPosition = { x: data.x, y: data.y };
        }
    });

    // Start move
    setInterval(changeDirection, 1000);

    // Shoot
    setInterval(() => {
        socket.emit('shoot', {});
    }, 1020);
});


// Disconnect
// socket.on('disconnect', () => {
//     console.log('Disconnected from server');
// });
