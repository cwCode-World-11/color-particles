const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
const particlesArray = new Array();
const randomColor = [
  "rgb(255,49,49)",
  "rgb(255,36,226)",
  "rgb(35,25,255)",
  "rgb(16,252,255)",
  "rgb(9,255,26)",
  "rgb(255,240,6)",
];
let colorRan = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Particles {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 8 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.09; //NOTE:Complete ah fade out aagala.size thaan chinnathaa aagi-irukku.
    }
  }

  drawCircle() {
    ctx.beginPath();
    // ctx.fillStyle = "yellow";
    ctx.fillStyle = randomColor[Math.floor(colorRan)];
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handlePartices() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].drawCircle();
    particlesArray[i].update();
    if (particlesArray[i].size <= 0.5) {
      // array.splice(index, howmany)
      particlesArray.splice(i, 1); //NOTE:Ippo thaan complete ah particles maraiyithu.
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(0,0,0,.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handlePartices();
  if (colorRan >= randomColor.length) {
    colorRan = 0;
  }
  colorRan += 0.05;
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particles());
  }
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
