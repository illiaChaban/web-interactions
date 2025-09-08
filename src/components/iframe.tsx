import { A } from "@solidjs/router";
import { onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { atom } from "~/utils/atom";
import type { JSX } from "solid-js";
import { BackButton } from "./back-button";
import { useRef } from "~/utils/use-ref";
import { SquareArrowOutUpRight } from "lucide-solid";
import { s } from "~/utils/styles";
import { AnimatedContainer } from "./animated-container";

export const IFrame = (p: { src: string }) => {
  const viewPort = atom<"mobile" | "desktop">("mobile");
  return (
    // <div class="flex-1 p-4 relative">
    //   <A href={p.src} class="btn absolute top-0 right-8 p-2 ">
    //     Go Fullscreen
    //   </A>
    //   <iframe
    //     class="w-full h-full border border-neutral-200 rounded-xl"
    //     src={p.src}
    //   />
    // </div>
    // <div class="mockup-browser border-base-300 border w-full">
    //   <div class="mockup-browser-toolbar">
    //     <div class="input">https://daisyui.com</div>
    //   </div>
    //   <div class="grid place-content-center border-t border-base-300 h-80">
    //     Hello!
    //   </div>
    // </div>

    // <div class="mockup-browser border border-base-300 w-full flex-1 p-4">
    //   <div class="mockup-browser-toolbar">
    //     <div class="flex">
    //       <div class="input">
    //         {isServer ? "" : window.location.origin}
    //         {p.src}
    //       </div>
    //       <A href={p.src} class="btn btn-sm btn-primary">
    //         <SquareArrowOutUpRight size="1.5em" /> Open Fullscreen
    //       </A>
    //     </div>
    //   </div>
    <>
      <header class="grid grid-cols-[1fr_auto] items-center px-6 pt-2 sm:pt-4 lg:grid-cols-[1fr_auto_1fr] py-2">
        {/* <div></div> */}
        <div />
        <div class="flex items-center">
          <div role="tablist" class="tabs tabs-box relative bg-base-300">
            <div
              class={s(
                "tab tab-active w-[72px] h-[40px] absolute",
                "left-1 transform transition-all",
                viewPort() === "mobile" ? "translate-x-0" : "translate-x-18"
              )}
            />
            <button
              role="tab"
              class={s("tab", viewPort() === "mobile" && "text-base-content!")}
              onClick={() => viewPort("mobile")}
            >
              <MobileIcon class="size-10" />
            </button>
            <button
              role="tab"
              class={s("tab", viewPort() === "desktop" && "text-base-content!")}
              onClick={() => viewPort("desktop")}
            >
              <DesktopIcon class="size-10" />
            </button>
          </div>

          {/* <div class="h-4 w-px bg-gray-950/10 dark:bg-white/20"></div> */}

          <div class="tooltip" data-tip="View Fullscreen">
            <A
              href={p.src}
              class="btn btn-ghost hover:btn-link hover:scale-110"
            >
              <FullscreenIcon class="size-10" />
            </A>
          </div>
        </div>
        <div class="justify-self-end"></div>
      </header>
      <div class="tabs tabs-box bg-base-300 flex-1 min-h-[800px] overflow-hidden flex flex-col">
        <div
          class="relative mx-auto w-full lg:data-mobile:w-95 transition-[width] h-full inset-shadow-sm tab tab-active p-[2px] flex-1 flex flex-col"
          data-mobile={viewPort() === "mobile" ? true : undefined}
        >
          {/* just an outline border */}
          {/* <div class="pointer-events-none absolute inset-0 rounded-xl outline -outline-offset-1 outline-black/10 dark:outline-white/20 "></div> */}
          <iframe
            // tw prop; not sure what for
            allow="clipboard-read; clipboard-write;"
            class={s("w-full  flex-1")}
            src={p.src}
          />
        </div>
      </div>
    </>
  );
};

/** render exit button when example is in dedicated url */
export const ExitStandalone = (p: { href: string }) => (
  <IsFullScreen>
    <A class="btn fixed top-4 right-4" href={p.href}>
      Exit fullscreen
    </A>
  </IsFullScreen>
);

/** only render when not in iframe */
const IsFullScreen = (p: { children: JSX.Element }) => {
  const isIframe = isServer ? false : window.self !== window.top;

  const mounted = atom(false);
  onMount(() => {
    mounted(true);
  });
  // show only after mount to avoid hydration errors
  return <>{mounted() && !isIframe ? p.children : null}</>;
};

const MobileIcon = (p: { class?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    class={p.class}
  >
    <path d="M16 13.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-13Z"></path>
    <path d="M19 13.5h3" stroke-linecap="round" stroke-opacity=".5"></path>
  </svg>
);

const DesktopIcon = (p: { class?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    class={p.class}
  >
    <path d="M11 11.5a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-13Z"></path>
    <path
      d="M11 11.5a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-10Z"
      stroke-opacity=".5"
    ></path>
    <path d="M18 25.5h6v4h-6v-4Z"></path>
    <path d="M17 29.5h8" stroke-linecap="square"></path>
  </svg>
);

const FullscreenIcon = (p: { class?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    class={p.class}
  >
    <path d="M11 14.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2v-11Z"></path>
    <path
      d="M24 15.5h3v3M17 24.5h-3v-3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="text-accent"
    ></path>
  </svg>
);
