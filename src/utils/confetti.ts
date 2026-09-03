import confetti from 'canvas-confetti';

export const triggerVictoryConfetti = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Ocean colors + gold + crimson + cobalt
    const colors = ['#0284c7', '#38bdf8', '#eab308', '#dc2626', '#2563eb', '#ffffff'];

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors
    });
  }, 250);
};

export const triggerMilestoneBurst = (xRatio = 0.5, yRatio = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x: xRatio, y: yRatio },
    colors: ['#38bdf8', '#eab308', '#34d399', '#ffffff'],
    zIndex: 9999,
  });
};
