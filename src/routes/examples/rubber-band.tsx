import { Page } from "~/components/page";
import { For, JSX, onCleanup, onMount } from "solid-js";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { Dynamic } from "solid-js/web";
import { onEvent } from "@illlia/ts-utils";
import { useRef } from "~/utils/use-ref";
import X from "lucide-solid/icons/x";
import Check from "lucide-solid/icons/check";

export default function RubberBand() {
  const active = atom<Set<string>>(new Set([pills[1], pills[4]]), {
    equals: false,
  });
  const toggleActive = (pill: string) => {
    active((set) => {
      set.has(pill) ? set.delete(pill) : set.add(pill);
      return set;
    });
  };

  return (
    <Page class="p-4">
      <h1 class="text-5xl">rubber band</h1>
      <h2>horixontal no band</h2>

      <RubberContainer
        as="ul"
        class="py-4 flex flex-nowrap gap-2 -mx-4 px-4 max-w-100vw overflow-x-auto no-scrollbar"
      >
        <For each={pills}>
          {(pill) => (
            <li>
              <button
                class={s(
                  "btn btn-accent text-nowrap",
                  !active().has(pill) && "btn-soft"
                )}
                onClick={() => toggleActive(pill)}
              >
                {pill}
              </button>
            </li>
          )}
        </For>
      </RubberContainer>

      <Swipable />

      <div class="p-4 bg-amber-200 flex *:min-h-[100px] overflow-x-auto no-scrollbar [scroll-snap-type:x_mandatory] scroll-smooth">
        <div class="min-w-[20vw] relative contrast-[20] bg-black">
          <Blob class="top-[50%] -translate-y-1/2" draggable />
          <Blob class="top-[50%] -translate-y-1/2 left-[40px]" draggable />
        </div>
        <div class="bg-red-400 min-w-[80vw] -[scroll-snap-align:center]" />
        <div class="bg-red-300 min-w-[20vw]" />
      </div>
    </Page>
  );
}

const Swipable = () => {
  const ref = useRef<HTMLDivElement>();

  const scroll = atom(0);
  const width = atom(0);

  onMount(() => {
    width(ref.current?.clientWidth ?? 0);
    onCleanup(
      onEvent(ref.current, "scroll", (e) => {
        scroll(ref.current.scrollLeft);
      })
    );
  });
  return (
    <div
      ref={ref}
      style={{ "--scroll-left": scroll() }}
      class="p-4 mb-4 bg-amber-200 flex *:min-h-[100px] overflow-x-auto no-scrollbar [scroll-snap-type:x_mandatory] scroll-smooth"
    >
      <div
        class="bg-red-300 min-w-[20vw] flex items-center justify-center "
        style={{
          opacity: `calc(1 - var(--scroll-left) * 1px / 20vw)`,
        }}
      >
        <X class="size-12 " />
      </div>
      <div class="bg-red-400 min-w-[80vw] [scroll-snap-align:center]" />
      <div
        class="bg-red-300 min-w-[20vw] flex items-center justify-center"
        style={{
          opacity: `calc((var(--scroll-left) * 1px - ${width()}px + 20vw) / 20vw)`,
        }}
      >
        <Check class="size-12 " />
      </div>
    </div>
  );
};

const Blob = s.div`
absolute size-[40px] rounded-full bg-[red] blur-[10px]
`;

const pills = [
  "< 5km",
  "< $100",
  "popular",
  "recommended",
  "just in",
  "top rated",
];

const RubberContainer = (p: {
  /** div default */
  as?: keyof JSX.IntrinsicElements;
  children?: JSX.Element;
  class?: string;
}) => {
  const width = 80;
  const mounted = atom(false);
  onMount(() => {
    mounted(true);
  });
  return (
    <Dynamic
      component={p.as ?? "div"}
      class={s("bg-yellow-500", p.class)}
      // style={{ width: `${width}px` }}
    >
      {/* <li /> */}
      <div class="bg-red-400 h-full" style={{ width: `${width}px` }}></div>
      {p.children}
      <div class="bg-red-400 h-full" style={{ width: `${width}px` }}></div>
    </Dynamic>
  );
};
