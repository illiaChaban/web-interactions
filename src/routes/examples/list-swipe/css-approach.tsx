import { Content, Page } from "~/components/page";
import { For, JSX, onCleanup, onMount } from "solid-js";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { Dynamic } from "solid-js/web";
import { onEvent } from "@illlia/ts-utils";
import { useRef } from "~/utils/use-ref";
import X from "lucide-solid/icons/x";
import Check from "lucide-solid/icons/check";

export default function ListSwipe() {
  return (
    <Page>
      <Content>
        <h1 class="text-5xl mb-4">list swipe (clear)</h1>
        <ul class="-mx-4">
          <Swipable />

          <For each={texts}>
            {(text) => (
              <li class="p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]">
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
  const ref = useRef<HTMLDivElement>();

  const scroll = atom(0);
  const width = atom(0);
  const actionWidth = () => width() * 0.3;

  const isUserScrolling = atom(false);

  const leftActive = atom(false);

  onMount(() => {
    width(ref.current?.clientWidth ?? 0);
    onCleanup(
      onEvent(ref.current, "scroll", (e) => {
        console.log(ref.current?.scrollLeft);
        scroll(ref.current.scrollLeft);
      })
    );

    // Track when user starts scrolling
    onCleanup(
      onEvent(ref.current, "touchstart", () => {
        isUserScrolling(true);
        console.log("touchstart");
      })
    );

    onCleanup(
      onEvent(ref.current, "touchend", () => {
        isUserScrolling(false);
        console.log("touchend");
        const threshold = actionWidth() / 4;

        // actionWidth - scrol < actionWidth - threshold
        // - scroll < - threshold
        // scroll > threshold
        const isLeftActive = scroll() < threshold;
        console.log("left active", {
          is: isLeftActive,
          // change: scroll() - actionWidth(),
          scroll: scroll(),
          actionWidth: actionWidth(),
        });
        if (isLeftActive) {
          leftActive(true);
          // complete
        }
      })
    );

    // let timeoutId: NodeJS.Timeout;
    // onCleanup(
    //   onEvent(ref.current, "wheel", () => {
    //     // clearTimeout(timeoutId);
    //     // isUserScrolling(true);
    //     // timeoutId = setTimeout(() => {
    //     //   isUserScrolling(false);
    //     // }, 16);
    //     console.log("wheel");
    //   })
    // );

    // onCleanup(
    //   onEvent(ref.current, "pointerdown", () => {
    //     console.log("pointerdown");
    //   })
    // );

    // onCleanup(
    //   onEvent(ref.current, "pointerup", () => {
    //     console.log("pointerup");
    //   })
    // );

    // onCleanup(
    //   onEvent(ref.current, "pointermove", () => {
    //     console.log("pointermove");
    //   })
    // );
  });
  return (
    <li
      ref={ref}
      style={{
        "--scroll-left": scroll(),
        "--action-width": `${actionWidth()}px`,
      }}
      class="flex overflow-x-auto no-scrollbar [scroll-snap-type:x_mandatory] scroll-smooth *:p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]"
    >
      <div
        class={s(
          "bg-green-300 flex items-center justify-center ",
          leftActive()
            ? "min-w-full transition-[min-width] [scroll-snap-align:center]"
            : "min-w-[var(--action-width)]"
        )}
        style={{
          opacity: leftActive()
            ? 1
            : `calc(1 - var(--scroll-left) * 1px / var(--action-width))`,
        }}
      >
        <Check class="size-12 " />
      </div>
      <div
        class={s("min-w-full", !leftActive() && "[scroll-snap-align:center]")}
      >
        lorem ipsum dolor sit amet consectetur adipisicing elit
      </div>
      <div
        class="bg-red-300  min-w-[var(--action-width)] flex items-center justify-center"
        style={{
          opacity: `calc((var(--scroll-left) * 1px - var(--action-width)) / var(--action-width))`,
          // opacity: `calc((var(--scroll-left) * 1px - 100vw - 25px) / 25px)`,
          // opacity: `calc((var(--scroll-left) * 1px - ${width()}px + 20vw) / 20vw)`,
        }}
      >
        <X class="size-12 " />
      </div>
    </li>
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
