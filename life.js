// Game of Life background on a wrapping grid
const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
const CELL = 14;
let cols, rows, grid, tick = 0;

function seed() {
  cols = Math.ceil(innerWidth / CELL);
  // screen.height so the mobile URL bar hiding doesn't expose an empty strip
  rows = Math.ceil(Math.max(innerHeight, screen.height) / CELL);
  canvas.width = cols * CELL;
  canvas.height = rows * CELL;
  grid = Array.from({ length: cols * rows }, () => Math.random() < 0.15);
}

function step() {
  grid = grid.map((alive, i) => {
    const x = i % cols, y = (i - x) / cols;
    let n = 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++)
        if (dx || dy) n += grid[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
    return n === 3 || (alive && n === 2);
  });
  // Life settles into still lifes; drop a patch of noise now and then to keep it moving
  if (++tick % 30 === 0) {
    const px = Math.floor(Math.random() * cols), py = Math.floor(Math.random() * rows);
    for (let dy = 0; dy < 6; dy++)
      for (let dx = 0; dx < 6; dx++)
        grid[((py + dy) % rows) * cols + ((px + dx) % cols)] = Math.random() < 0.5;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f2f2f2';
  grid.forEach((alive, i) => {
    if (alive) ctx.fillRect((i % cols) * CELL, Math.floor(i / cols) * CELL, CELL - 1, CELL - 1);
  });
}

function start() {
  seed();
  for (let i = 0; i < 30; i++) step(); // skip the initial noise
  draw();
}

start();
addEventListener('resize', () => {
  if (Math.ceil(innerWidth / CELL) !== cols) start(); // ignore height-only changes (mobile URL bar)
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    if (document.hidden) return;
    step();
    draw();
  }, 150);
}
