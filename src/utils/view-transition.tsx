export const viewTransition = (
  type: ViewTransitionAnimation,
  callback: () => void
) => {
  if (!document.startViewTransition) return callback();

  const style = document.createElement("style");
  style.innerHTML = viewTransitions[type];

  document.head.appendChild(style);

  const transition = document.startViewTransition(() => {
    callback();
  });

  // Wait for the transition to finish before removing the dataset attribute
  transition.finished.then(() => {
    document.head.removeChild(style);
  });
};

const SLIDE_IN = `
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

const SLIDE_OUT = `
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

const SLIDE_IN_2_SHARED = `
  :root {
    --ease-out-ios: cubic-bezier(0.25, 0.1, 0.25, 1);

    &::view-transition-old(root),
    &::view-transition-new(root) {
      animation-duration: 0.35s;
      animation-timing-function: var(--ease-out-ios);
    }
  }

  @media (prefers-reduced-motion) {
    :root {
      &::view-transition-old(root),
      &::view-transition-new(root) {
        animation-duration: 0s;
        animation-name: none !important;
      }
    }
  }
`;

const SLIDE_IN_2 = `
  ${SLIDE_IN_2_SHARED}
  @keyframes slide-in {
    from {
      translate: 100vw 0;
    }
  }

  @keyframes to-left {
    to {
      translate: -30vw 0;
      filter: brightness(0.7);
    }
  }

  :root {
    &::view-transition-old(root) {
      animation-name: to-left;
    }

    &::view-transition-new(root) {
      animation-name: slide-in;
    }
  }
`;

const SLIDE_OUT_2 = `
  ${SLIDE_IN_2_SHARED}

  @keyframes slide-out {
    to {
      translate: 100vw 0;
    }
  }

  @keyframes from-left {
    from {
      translate: -30vw 0;
      filter: brightness(0.7);
    }
  }

  :root {
    &::view-transition-new(root) {
      animation-name: from-left;
    }

    &::view-transition-old(root) {
      animation-name: slide-out;
      z-index: 1;
    }
  }

  @media (prefers-reduced-motion) {
    :root {
      &::view-transition-old(root) {
        z-index: auto;
      }
    }
  }
`;

const viewTransitions = {
  "slide-in": SLIDE_IN,
  "slide-out": SLIDE_OUT,
  "slide-in-2": SLIDE_IN_2,
  "slide-out-2": SLIDE_OUT_2,
};

export type ViewTransitionAnimation = keyof typeof viewTransitions;
