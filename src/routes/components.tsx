import type { JSX } from "solid-js";
import { IFrame } from "~/components/iframe";
import Nav from "~/presentation-components/nav";

export default function Components() {
  return (
    <div class="flex flex-col h-screen">
      <Nav />
      <h1 class="text-4xl font-bold p-4">Airbnb combobox</h1>
      <div class="flex-1 p-4">
        <IFrame src="/examples/combobox" />
      </div>
    </div>
  );
}
