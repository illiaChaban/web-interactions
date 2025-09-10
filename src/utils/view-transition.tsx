export const viewTransition = (
  type: ViewTransitionAnimation,
  callback: () => void
) => {
  if (!document.startViewTransition) return callback();

  const style = (
    <style>{viewTransitions[type]}</style>
  ) as any as HTMLStyleElement;

  document.head.appendChild(style);

  const transition = document.startViewTransition(() => {
    callback();
  });

  // Wait for the transition to finish before removing the dataset attribute
  transition.finished.then(() => {
    document.head.removeChild(style);
  });
};

const slideInStyles = `
  @keyframes slide-in {
    from {
      translate: 100vw 0;
    }
  }

  @keyframes shrink {
    to {
      scale: 0.98;
    }
  }

  :root {
    &::view-transition-old(root),
    &::view-transition-new(root) {
      animation-duration: 0.35s;
      animation-name: none;
    }

    &::view-transition-old(root) {
      animation-timing-function: linear;
      animation-name: shrink;
      transform-origin: bottom;
      box-shadow: 0px -20px 20px 20px black;
      border-radius: 16px;
      overflow: hidden;
    }

    &::view-transition-new(root) {
      animation-timing-function: var(--ease-out-cubic);
      animation-name: slide-in;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
    }
  }
`;

const slideOutStyles = `
  @keyframes slide-out {
    to {
      translate: 100vw 0;
    }
  }

  @keyframes grow {
    from {
      scale: 0.98;
    }
  }

  :root {
    &::view-transition-old(root),
    &::view-transition-new(root) {
      animation-duration: 0.35s;
      animation-name: none;
    }

    &::view-transition-new(root) {
      animation-timing-function: ease-out;
      animation-name: grow;
      transform-origin: bottom;
    }

    &::view-transition-old(root) {
      animation-timing-function: var(--ease-out-cubic);
      animation-name: slide-out;
      z-index: 1;
    }
  }
`;

const viewTransitions = {
  "slide-in": slideInStyles,
  "slide-out": slideOutStyles,
};

export type ViewTransitionAnimation = keyof typeof viewTransitions;
