const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const server = app.listen(4000, () => console.log('running'));

io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.44 },
  { year: '1990', population: 5.31 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.83 },
];
io.on('connection', async (socket) => {
  for (let i = 0; i <= 10; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    socket.emit('data', data[i]);
  }
});
