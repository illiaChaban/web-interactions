import type { JSX } from "solid-js";
import Nav from "~/presentation-components/nav";

export default function DesktopMenuSlideLeft() {
  return (
    <div class="flex flex-col h-screen">
      <Nav />
      <h1 class="text-4xl font-bold p-4">Desktop menu slide left example</h1>
      <div class="flex-1 p-4 min-h-[600px]">
        <iframe
          class="w-full h-full border border-neutral-200 rounded-xl"
          src="/examples/desktop-menu-slide-left"
        />
      </div>
      <h1 class="text-4xl font-bold p-4">Desktop menu options example</h1>
      <div class="flex-1 p-4 min-h-[600px]">
        <iframe
          class="w-full h-full border border-neutral-200 rounded-xl"
          src="/examples/desktop-menu"
        />
      </div>
    </div>
  );
}
