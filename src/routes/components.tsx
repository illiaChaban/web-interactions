import type { JSX } from "solid-js";
import Nav from "~/presentation-components/nav";

export default function Components() {
  return (
    <div class="flex flex-col h-screen">
      <Nav />
      <h1 class="text-4xl font-bold p-4">Airbnb combobox</h1>
      <div class="flex-1 p-4">
        <iframe
          class="w-full h-full border border-neutral-200 rounded-xl"
          src="/examples/combobox"
        />
      </div>
    </div>
  );
}
