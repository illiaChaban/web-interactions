import { _, call, clamp, debounce, onEvent } from "@illlia/ts-utils";
import { createEffect, JSX, onCleanup, onMount } from "solid-js";
import { createScrollAnimation } from "~/utils/animate-scroll";
import { atom } from "~/utils/atom";
import { trackFps } from "~/utils/debug/track-fps";
import { s } from "~/utils/styles";
import { useRef } from "~/utils/use-ref";

export function StickyHeader(p: {
  children: JSX.Element;
  /** scroll container; defaults to window */
  getContainer?: () => HTMLElement | Window;
  /** left button */
  left?: JSX.Element;
  /** right buttons */
  right?: JSX.Element;
}) {
  const headerRef = useRef();
  const collapsedTitleRef = useRef();
  const expandedTitleRef = useRef();
  const expandedTitleContainerRef = useRef();

  const isCollapsed = atom(false);

  onMount(() => {
    const container = p.getContainer?.() ?? window;
    const header = headerRef.current;
    const expandedTitle = expandedTitleRef.current;
    const collapsedTitle = collapsedTitleRef.current;

    const setup = () => {
      const collapsedStyle = getComputedStyle(collapsedTitle);
      const collapsed = {
        fontSize: parseFloat(collapsedStyle.fontSize),
        height: parseFloat(collapsedStyle.height),
        left: collapsedTitle.getBoundingClientRect().left,
      };

      const expandedStyle = getComputedStyle(expandedTitle);
      const expanded = {
        fontSize: parseFloat(expandedStyle.fontSize),
        height: parseFloat(expandedStyle.height),
        left: expandedTitle.getBoundingClientRect().left,
      };

      const minScale = collapsed.fontSize / expanded.fontSize;
      /** past this point scaled down expanded title starts intersecting (overlaying) the header  */
      const allowedYDelta = expanded.height - expanded.height * minScale;

      const getTranslateX = call(() => {
        const offset = (header.clientHeight - collapsed.height) / 2 + collapsed.height;
        const max = collapsed.left - expanded.left;
        const timeline = allowedYDelta + offset;
        const coeeficient = max / timeline;
        return (y: number) => _(y * coeeficient, clamp(0, max));
      });

      const getScale = (y: number) =>
        _(
          1 - y / (allowedYDelta + 100),
          clamp(minScale, 1),
          // tap((x) => {
          //   toLog.before = x;
          // }),

          // TODO: can this logic be moved to CSS to avoid JS cubic bezier calculation?
          // apply easing to make scale transition smoother (bigger values => lower scale)
          // otherwise, animation looks junky for bigger scale transition at the beginning
          // when the font size is largest and transition is most noticeable
          // TODO: npm i bezier-easing
          // __(
          //   (v) => (v - minScale) / (1 - minScale),
          //   /** easeInSine https://easings.net/#easeInSine */
          //   cubicBezier(0.12, 0, 0.39, 0),
          //   (v) => v * (1 - minScale) + minScale,
          // ),

          // tap((x) => {
          //   toLog.after = x;
          // }),
          // clamp(minScale, 1)
        );

      return {
        collapsedStyle,
        collapsed,
        expandedStyle,
        expanded,
        minScale,
        allowedYDelta,
        getTranslateX,
        getScale,
      };
    };

    let cache = setup();

    const animate = () => {
      const { getTranslateX, getScale, collapsed, allowedYDelta } = cache;

      const y = container instanceof HTMLElement ? container.scrollTop : container.scrollY;
      expandedTitle.style.transform = `translateX(${getTranslateX(y)}px) scale(${getScale(y)})`;

      const opacity = clamp(0, 1)((collapsed.height - y + allowedYDelta) / collapsed.height);

      // avoid title blocking left (back) button
      expandedTitle.style.pointerEvents = opacity < 0.75 ? "none" : "auto";
      expandedTitle.style.opacity = opacity.toString();
      collapsedTitle.style.opacity = (1 - opacity).toString();

      isCollapsed(opacity === 0);
    };

    // initial animation in case scrollTop is not 0
    animate();

    const [handleScroll, cleanup] = createScrollAnimation(animate);

    onCleanup(
      onEvent(
        window,
        "resize",
        debounce(50)(() => {
          cache = setup();
          animate();
        }),
        { passive: true },
      ),
    );

    onCleanup(onEvent(container, "scroll", handleScroll, { passive: true }));
    onCleanup(cleanup);
  });

  return (
    <>
      <header
        ref={headerRef}
        class={s`
          bg-base-100
          sticky top 
          border-b ${isCollapsed() ? "border-base-300" : "border-transparent"}
        `}
      >
        <div
          class={s`
            flex items-center gap-1
            px-content max-content mx-auto
          `}
        >
          {/* pipe is required due to solid start bug with hydration @issue https://github.com/solidjs/solid-start/issues/1993 */}
          {_(p.left, (left) => left && <div class="-ml-3">{left}</div>)}
          <div
            ref={collapsedTitleRef}
            class="flex-1 whitespace-nowrap text-ellipsis overflow-hidden opacity-0"
          >
            {p.children}
          </div>
          {/* pipe is required due to solid start bug with hydration @issue https://github.com/solidjs/solid-start/issues/1993 */}
          {_(p.right, (right) => right && <div class="flex gap-1 -mr-3">{right}</div>)}
        </div>
      </header>
      <div
        ref={expandedTitleContainerRef}
        class="px-content max-content mx-auto pointer-events-none"
      >
        <h1 ref={expandedTitleRef} class="origin-bottom-left text-3xl pointer-events-auto">
          {p.children}
        </h1>
      </div>
    </>
  );
}
