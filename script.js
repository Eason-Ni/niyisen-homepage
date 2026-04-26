const canvas = document.querySelector("#signalCanvas");
const context = canvas.getContext("2d");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

const labels = ["query", "visual", "intent", "items", "signals", "rank"];
let animationFrame;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function draw(time) {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.29;

  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  const nodes = labels.map((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length + time * 0.00016;
    const pulse = Math.sin(time * 0.0012 + index) * 10;
    return {
      label,
      x: centerX + Math.cos(angle) * (radius + pulse),
      y: centerY + Math.sin(angle) * (radius * 0.78 + pulse),
    };
  });

  context.strokeStyle = "rgba(31, 37, 35, 0.16)";
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if ((i + j) % 2 === 0 || Math.abs(i - j) === 1) {
        context.beginPath();
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.stroke();
      }
    }
  }

  const sweep = (time * 0.0004) % (Math.PI * 2);
  context.beginPath();
  context.arc(centerX, centerY, radius * 1.12, sweep, sweep + Math.PI * 0.8);
  context.strokeStyle = "rgba(179, 106, 46, 0.42)";
  context.lineWidth = 3;
  context.stroke();

  nodes.forEach((node, index) => {
    const isPrimary = index === Math.floor((time * 0.001) % nodes.length);
    context.beginPath();
    context.arc(node.x, node.y, isPrimary ? 14 : 10, 0, Math.PI * 2);
    context.fillStyle = isPrimary ? "#255f4b" : "#fffdf8";
    context.strokeStyle = isPrimary ? "#255f4b" : "rgba(31, 37, 35, 0.32)";
    context.lineWidth = 1.5;
    context.fill();
    context.stroke();

    context.font = "700 12px Avenir Next, Helvetica, sans-serif";
    context.fillStyle = isPrimary ? "#255f4b" : "#66706c";
    context.textAlign = "center";
    context.fillText(node.label, node.x, node.y + 31);
  });

  context.beginPath();
  context.arc(centerX, centerY, 45, 0, Math.PI * 2);
  context.fillStyle = "#1f2523";
  context.fill();
  context.font = "700 13px Avenir Next, Helvetica, sans-serif";
  context.fillStyle = "#fffdf8";
  context.textAlign = "center";
  context.fillText("match", centerX, centerY + 5);

  animationFrame = requestAnimationFrame(draw);
}

resizeCanvas();
draw(0);

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  draw(0);
});
