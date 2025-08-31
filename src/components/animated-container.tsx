import {
  createEffect,
  For,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js";
import { ChevronDown, CarFront } from "~/icons";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { Override } from "~/utils/types";
import { useRef } from "~/utils/use-ref";

export const AnimatedContainer = (
  _p: {
    children: JSX.Element;
  } & Override<
    JSX.HTMLAttributes<HTMLDivElement>,
    {
      style?: JSX.CSSProperties;
    }
  >
) => {
  const [p, otherProps] = splitProps(_p, ["children", "class", "style"]);
  const ref = useRef<HTMLDivElement>();
  const size = atom<{ width: string; height: string }>({
    width: "auto",
    height: "auto",
  });

  onMount(() => {
    if (!ref.current) return;

    // Create ResizeObserver to track size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        size({ width: `${width}px`, height: `${height}px` });
      }
    });

    // Start observing the element
    resizeObserver.observe(ref.current);

    // Clean up the observer when component unmounts
    onCleanup(() => {
      resizeObserver.disconnect();
    });
  });

  return (
    <div
      class={s`overflow-hidden rounded-[32px] bg-neutral-100 shadow-xl ${p.class}`}
      style={{
        width: size().width,
        height: size().height,
        transition: bouncyTransition,
        ...p.style,
      }}
      {...otherProps}
    >
      <div ref={ref} class="w-max h-max">
        {p.children}
      </div>
    </div>
  );
};

const bouncyEasing = "cubic-bezier(.42,.11,.54,1.35)";
const duration = "250ms";
export const bouncyTransition = `width ${duration} ${bouncyEasing}, height ${duration} ${bouncyEasing}`;
