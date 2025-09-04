import type { JSX } from "solid-js";
import Nav from "~/presentation-components/nav";
import { IFrame } from "~/components/iframe";

export default function Components() {
  return (
    <div class="flex flex-col h-screen">
      <Nav />
      <h1 class="text-4xl font-bold p-4">Slide in</h1>
      <IFrame src="/examples/slide-in" />
    </div>
  );
}
