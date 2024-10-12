const io = require('socket.io-client');

// Config socket
const SOCKET_SERVER_ADDR = process.env.SOCKET_SERVER || 'wss://your-socket-server.com:port';
const TOKEN = process.env.TOKEN || 'your_token_here';
// const SOCKET_SERVER_ADDR = process.env.SOCKET_SERVER;
// const TOKEN = process.env.TOKEN;


// Create socket connect
const socket = io(SOCKET_SERVER_ADDR, {
    auth: {
        token: TOKEN
    }
});

// Tham gia vào trò chơi sau khi kết nối
// socket.on('connect', () => {
//     console.log('Connected to server');
//     socket.emit('join', {});

//     // Di chuyển bot
//     setInterval(() => {
//         const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
//         const randomDir = directions[Math.floor(Math.random() * directions.length)];
//         socket.emit('move', { orient: randomDir });
//     }, 1000);
// });

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('join', {});
});

socket.on('game_start', () => {
    console.log('Game started');
    // move
    setInterval(() => {
      const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
      const randomDir = directions[Math.floor(Math.random() * directions.length)];
      socket.emit('move', { orient: randomDir });
    }, 1000);
  
    // Shoot
    setInterval(() => {
      socket.emit('shoot', {});
    }, 510);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
