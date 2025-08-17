const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Текст, который будет повторяться
const baseText = 'Я ЛЮБЛЮ ТЕБЯ СОЛНЫШКО   ';
const chars = baseText.split('');

// Для каждой колонки — массив Y-позиций
const drops = Array(columns).fill(0);

// Для каждой колонки — смещение начала текста
const offsets = drops.map(() => Math.floor(Math.random() * chars.length));

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 0, 115, 1)';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Вычисляем текущий символ с учётом смещения
    const charIndex = (drops[i] + offsets[i]) % chars.length;
    const text = chars[charIndex];

    ctx.fillText(text, x, y);

    // Сброс капли с вероятностью
    if (y > canvas.height && Math.random() > 0.9) {
      drops[i] = 0;
      offsets[i] = Math.floor(Math.random() * chars.length); // новое смещение
    }

    drops[i]++;
  }
}

setInterval(draw, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
