import { A } from "@solidjs/router";
import { onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { atom } from "~/utils/atom";
import type { JSX } from "solid-js";
import { BackButton } from "./back-button";

export const IFrame = (p: { src: string }) => {
  return (
    <div class="flex-1 p-4 relative">
      <A
        href={p.src}
        class="absolute top-0 right-0 p-2 border rounded-xl bg-white"
      >
        Go Fullscreen
      </A>
      <iframe
        class="w-full h-full border border-neutral-200 rounded-xl"
        src={p.src}
      />
    </div>
  );
};

/** only render when not in iframe */
const IsFullScreen = (p: { children: JSX.Element }) => {
  const isIframe = isServer ? false : window.self !== window.top;

  const mounted = atom(false);
  onMount(() => {
    mounted(true);
  });
  return <>{mounted() && !isIframe ? p.children : null}</>;
};

export const ExitStandalone = (p: { href: string }) => (
  <IsFullScreen>
    <A class="fixed top-4 right-4" href={p.href}>
      Exit fullscreen
    </A>
  </IsFullScreen>
);
