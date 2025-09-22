import { onEvent } from "@illlia/ts-utils";

export const createScrollAnimation = (
  callback: () => void,
  /** options */
  { debounceTime = 150 }: { debounceTime?: number } = {}
) => {
  let requestAnimationFrameId: number | null = null;
  let lastScrollEventTime: number | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  const animate = () => {
    requestAnimationFrameId = requestAnimationFrame(() => {
      callback();
      animate();
    });
  };

  const reset = () => {
    requestAnimationFrameId && cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = null;
    lastScrollEventTime = null;
    timeoutId && clearTimeout(timeoutId);
    timeoutId = null;
  };
  // This function is a performant version of debounce
  // instead of setting and clearing a timeout on each scroll event, which can be st
  // it is limited to creating timeout to 1000 / DEBOUNCE_TIME times per second
  const scheduleStopAnimating = () => {
    if (timeoutId) return; // already scheduled

    const timePassed = lastScrollEventTime
      ? performance.now() - lastScrollEventTime
      : 0;

    if (timePassed >= debounceTime) return reset();

    const timeLeft = debounceTime - timePassed;

    timeoutId = setTimeout(() => {
      timeoutId = null;
      scheduleStopAnimating();
    }, timeLeft);
  };

  const handleScroll = () => {
    const isFirstFrame = !lastScrollEventTime;
    lastScrollEventTime = e.timeStamp;

    if (isFirstFrame) animate();

    scheduleStopAnimating();
  };

  return [handleScroll, reset];
};
