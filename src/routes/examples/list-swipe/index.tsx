import { Content, Page } from "~/components/page";
import { For, JSX, onCleanup, onMount } from "solid-js";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { Dynamic } from "solid-js/web";
import { onEvent } from "@illlia/ts-utils";
import { useRef } from "~/utils/use-ref";
import X from "lucide-solid/icons/x";
import Check from "lucide-solid/icons/check";
import { createScrollAnimation } from "~/utils/animate-scroll";

export default function ListSwipe() {
  return (
    <Page class="">
      <Content>
        <h1 class="text-5xl mb-4">list swipe (clear)</h1>
        <ul class="-mx-4 overflow-x-hidden">
          <Swipable />

          <For each={texts}>
            {(text) => (
              <li class="px-4 py-3 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]">
                {text}
              </li>
            )}
          </For>
        </ul>
        <div class="fade-out-bar h-16 w-[100vw] -ml-4 -mb-4" />
      </Content>
    </Page>
  );
}

const LiContent = s.div`p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]`;

const Swipable = (p: { class?: string }) => {
  const ref = useRef<HTMLLIElement>();

  // const scroll = atom(0);
  const width = atom(0);
  const actionWidth = () => width() * 0.2;

  const leftActive = atom(false);

  onMount(() => {
    const el = ref?.current;
    if (!el) return;
    width(el.clientWidth);
    // onCleanup(
    //   onEvent(ref.current, "scroll", (e) => {
    //     console.log(ref.current?.scrollLeft);
    //     scroll(ref.current.scrollLeft);
    //   })
    // );

    let startX = 0;

    const [handleScroll, reset] = createScrollAnimation(() => {}, {
      /** large debounce time since we'll handle touchend manually */
      debounceTime: 1000,
    });

    // Track when user starts scrolling
    onCleanup(
      onEvent(el, "touchstart", (e) => {
        console.log("touchstart");
        startX = e.touches[0].clientX;
        handleScroll();
      })
    );

    onCleanup(
      onEvent(el, "touchend", () => {
        console.log("touchend");

        reset();

        requestAnimationFrame(() => {
          el.style.transition = "transform 0.2s ease-in-out";
          el.style.transform = "translateX(0)";
        });

        // todo: need cleanup here?
        onEvent(el, "transitionend", () => {
          el.style.transition = "none";
        });
      })
    );

    const rubberBandBase = (
      /** The raw distance the user has swiped */
      delta: number,
      /** The maximum allowed drag distance */
      dimension: number,

      /** smaller -> less elastic */
      coefficient = 0.55
    ) => {
      // const change = Math.abs(delta) - threshold;

      const direction = Math.sign(delta);
      delta = Math.abs(delta);

      const rubber = Math.min(
        delta, // can never be more than the delta
        delta ** coefficient * dimension ** (1 - coefficient)
      );
      return direction * rubber;
    };

    const rubberBand = (
      /** The raw distance the user has swiped */
      delta: number,
      /** The maximum allowed drag distance */
      dimension: number,
      /** start applying the elastic effect after this threshold */
      threshold = 0,
      /** smaller -> less elastic */
      coefficient = 0.55
    ) => {
      const excess = Math.abs(delta) - threshold;

      if (excess < 0) return delta;

      // const change = Math.abs(delta) - threshold;

      const direction = Math.sign(delta);

      const rubber = Math.min(
        excess, // can never be more than the delta
        excess ** coefficient * dimension ** (1 - coefficient)
      );
      return direction * (threshold + rubber);
    };

    onCleanup(
      onEvent(
        el,
        "touchmove",
        (e) => {
          e.preventDefault();
          requestAnimationFrame(() => {
            // e.preventDefault();
            const x = e.touches[0].clientX;
            const delta = x - startX;
            console.log("touchmove", { x, delta, startX });

            // rubber band formula
            // const change = rubberBand(delta, 50, 50, 0.3);

            const threshold = 50; // don't apply rubber band before that
            let change = delta;
            const excess = Math.abs(delta) - threshold;
            const direction = Math.sign(delta);
            const pastThreshold = excess > 0;
            if (pastThreshold) {
              change =
                direction *
                (threshold +
                  rubberBandBase(Math.abs(delta) - threshold, 50, 0.3));
            }

            const isLeftActive = pastThreshold && direction === 1;
            if (isLeftActive) {
              el.classList.add(..."bg-green-400 line-through".split(" "));
            } else {
              el.classList.remove(..."bg-green-400 line-through".split(" "));
            }

            el.style.transform = `translateX(${change}px)`;
          });
        },
        { passive: false }
      )
    );
  });
  return (
    <LiContent as="li" ref={ref} class="relative [will-change:transform]">
      <div
        class={s(
          "absolute inset-y-0 right-[100vw] w-full bg-green-400 flex items-center justify-end p-4"
        )}
      >
        <Check class="size-12 " />
      </div>
      <div class={s("min-w-full")}>
        lorem ipsum dolor sit amet consectetur adipisicing elit
      </div>
      <div
        class={s(
          "absolute inset-y-0 left-[100vw] w-full bg-red-400 flex items-center justify-start p-4"
        )}
      >
        <X class="size-12 " />
      </div>
    </LiContent>
  );
};

const texts = [
  "< 5km",
  "< $100",
  "popular",
  "recommended",
  "just in",
  "top rated",
  "lorem ipsum",
  "lorem ipsum dolor sit amet consectetur adipisicing elit",
  "lorem ipsum ",
  "lorem ipsum ",
  "lorem ipsum ",
];
