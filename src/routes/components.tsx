import type { JSX } from "solid-js";
import { IFrame } from "~/components/iframe";
import Nav from "~/presentation-components/nav";

export default function Components() {
  return (
    <div class="flex flex-col h-screen">
      <Nav />
      <h1 class="text-4xl mt-4">Components</h1>

      <h2 class="text-2xl font-bold p-4">Rubber band</h2>
      <p>horizontal</p>
      <div class="flex-1 p-4">
        <IFrame src="/examples/rubber-band" />
      </div>

      <h2 class="text-2xl font-bold p-4">Airbnb combobox</h2>
      <div class="flex-1 p-4">
        <IFrame src="/examples/combobox" />
      </div>

      <h2 class="text-2xl font-bold p-4">Sticky header</h2>
      <div class="flex-1 p-4">
        <IFrame src="/examples/sticky-header" />
      </div>
    </div>
  );
}
