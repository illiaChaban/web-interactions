export const viewTransition = (
  type: ViewTransitionAnimation,
  callback: () => void
) => {
  if (!document.startViewTransition) return callback();

  const transition = document.startViewTransition(() => {
    document.documentElement.dataset.transition = type;
    callback();
  });

  // Wait for the transition to finish before removing the dataset attribute
  transition.finished.then(() => {
    delete document.documentElement.dataset.transition;
  });
};

export type ViewTransitionAnimation = "slide-in" | "slide-out";
