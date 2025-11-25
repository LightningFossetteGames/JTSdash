const startScreen = document.getElementById("startScreen");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const blockImg = document.getElementById("blockImg");

let player = { x: 50, y: 300, size: 40, vy: 0, jump: -10, gravity: 0.5 };
let obstacles = [];
let score = 0;
let running = false;

function resetGame() {
  player.y = 300;
  player.vy = 0;
  obstacles = [];
  score = 0;
}

function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  running = true;
  resetGame();
  loop();
}

startScreen.addEventListener("mousedown", startGame);
canvas.addEventListener("mousedown", () => {
  if (player.y >= 300) player.vy = player.jump;
});

function spawnObstacle() {
  obstacles.push({
    x: 800,
    y: 300,
    width: 40,
    height: 40
  });
}

function update() {
  player.vy += player.gravity;
  player.y += player.vy;

  if (player.y > 300) player.y = 300;

  obstacles.forEach(o => (o.x -= 5));

  obstacles = obstacles.filter(o => o.x > -50);

  if (Math.random() < 0.02) spawnObstacle();

  obstacles.forEach(o => {
    if (
      player.x < o.x + o.width &&
      player.x + player.size > o.x &&
      player.y < o.y + o.height &&
      player.y + player.size > o.y
    ) {
      running = false;
      canvas.style.display = "none";
      startScreen.style.display = "flex";
    }
  });

  score++;
}

function draw() {
  ctx.fillStyle = "#5dd15d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(blockImg, player.x, player.y, player.size, player.size);

  obstacles.forEach(o => {
    ctx.drawImage(blockImg, o.x, o.y, o.width, o.height);
  });

  ctx.fillStyle = "white";
  ctx.font = "24px Fredoka One";
  ctx.fillText("Score: " + score, 20, 30);
}

function loop() {
  if (!running) return;
  update();
  draw();
  requestAnimationFrame(loop);
}
