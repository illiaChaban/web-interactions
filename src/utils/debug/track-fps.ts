export const trackFps = (() => {
  const createEl = () => {
    const existing = document.querySelector("#track-fps");
    if (existing) existing.remove();
    const el = document.createElement("div");
    el.id = "track-fps";
    el.style.position = "fixed";
    el.style.bottom = "8px";
    el.style.right = "8px";
    el.style.width = "48px";
    el.style.height = "48px";
    el.style.border = "1px solid black";
    el.style.backgroundColor = "white";
    el.style.color = "black";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.borderRadius = "4px";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    document.body.appendChild(el);
    return el;
  };

  let lastFrameTime = 0;
  let frameCount = 0;
  let el: HTMLDivElement | null = null;
  let resetTimeout: NodeJS.Timeout | null = null;

  const reset = () => {
    lastFrameTime = 0;
    frameCount = 0;
    if (el) el.remove();
    el = null;
    resetTimeout = null;
  };

  const setupReset = () => {
    resetTimeout = setTimeout(() => {
      const elapsed = performance.now() - lastFrameTime;
      if (elapsed > 1500) {
        reset();
      } else {
        setupReset();
      }
    }, 2000);
  };

  const DIVIDER = 4;

  return function trackFps() {
    if (!lastFrameTime) {
      lastFrameTime = performance.now();
      return;
    }

    const now = performance.now();
    const elapsed = now - lastFrameTime;
    frameCount++;

    if (elapsed >= 1000 / DIVIDER) {
      el ??= createEl();
      el.textContent = `${Math.round(frameCount * DIVIDER)}`;
      frameCount = 0;
      lastFrameTime = now;
    }

    if (!resetTimeout) {
      setupReset();
    }
  };
})();
