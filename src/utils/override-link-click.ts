export const overrideLinkClick =
  <T extends MouseEvent>(callback: (e: T) => void) =>
  (e: T) => {
    // Allow default behavior if any modifier key is pressed
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return; // Let the browser handle the navigation
    }
    e.preventDefault();
    callback(e);
  };
