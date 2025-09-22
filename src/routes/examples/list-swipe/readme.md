Considered approaches:

- using css scroll-snap-type and scroll-snap-align properties for browser to handle swipes by default

  - Challenges:

    - still have to keep track of when user manually stops scrolling (touchevent, wheel, touchpad).

      - there's no browser event for touchpad scroll (cannot detect if user still has finger on the touchpad after they stopped actively scrolling)
        - cannot rely on it, must use touch events manually ?

    - the browser rubber band looks nice, but the container is clipping outside divs if i wanted to put something as position: absolute outside the container to have continuity

Clear goals:

- more information density than original clear (closer to apple notes), but better visual hierarchy and separation (apple notes: quotes need extra spacing )
  - todo: compare spacing from screenshtos for both apps for the same content (quotes with and without extra spacing )
  - todo: how to handle nested nodes?
