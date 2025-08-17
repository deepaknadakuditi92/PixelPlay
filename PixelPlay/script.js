const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;
let currentColor = colorPicker.value;

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  draw(e);
});

canvas.addEventListener("touchstart", (e) => {
  drawing = true;
  draw(e.touches[0]);
}, { passive: false });

// Stop drawing
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);
canvas.addEventListener("touchend", () => drawing = false);

// Drawing logic
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", (e) => {
  draw(e.touches[0]);
  e.preventDefault();
}, { passive: false });

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

// Color change
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

// Clear canvas
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
