import { createEffect, For, JSX, onCleanup, onMount } from "solid-js";
import { AnimatedContainer } from "~/components/animated-container";
import { ChevronDown, CarFront } from "~/icons";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { useRef } from "~/utils/use-ref";

export default function Combobox() {
  const expanded = atom(false);
  const initial = atom(true);
  const toggle = () => {
    expanded((v) => !v);
    initial(false);
  };

  const travelOption = atom(travelOptions[0]);

  /** don't animate on initial render */
  const fadeInCss = () =>
    initial() ? "" : s`animate-fadeIn [animation-delay:100ms] opacity-0`;

  return (
    <main class="text-center mx-auto p-4 h-screen  text-black flex justify-center items-center bg-dotted">
      <AnimatedContainer>
        {expanded() ? (
          <ul class={s`flex flex-col p-2 ${fadeInCss()}`}>
            <For each={travelOptions}>
              {(option) => (
                <li>
                  <Button
                    class={s`p-2 rounded-[24px] w-full transition-colors ${
                      travelOption() === option && "bg-neutral-200"
                    }`}
                    onClick={() => {
                      travelOption(option);
                      toggle();
                    }}
                  >
                    {option.el}
                  </Button>
                </li>
              )}
            </For>
          </ul>
        ) : (
          <Container
            as={Button}
            onClick={toggle}
            class={s`group ${fadeInCss()} text-sm !p-2`}
          >
            {travelOption().el}
            <span class="size-[1.5em] group-hover:bg-neutral-200 rounded-full transition-colors p-1">
              <ChevronDown />
            </span>
          </Container>
        )}
      </AnimatedContainer>
    </main>
  );
}
const Button = s.button`flex items-center gap-[0.5em] border-none flex-nowrap whitespace-nowrap bg-neutral-50`;

const Container = s.div`p-4`;

const Car = s(CarFront)`size-[1.5em]`;

const travelOptions = [
  {
    id: "car",
    el: (
      <>
        <Car /> 55 min
      </>
    ),
  },
  {
    id: "bike",
    el: (
      <>
        <Car /> 3 hrs 30 min
      </>
    ),
  },
  {
    id: "train",
    el: (
      <>
        <Car /> 1 hr 20 min
      </>
    ),
  },
];
