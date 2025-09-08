import type { JSX } from "solid-js";
import Nav from "~/presentation-components/nav";
import { IFrame } from "~/components/iframe";

export default function Components() {
  return (
    <div class="min-h-screen">
      <Nav />
      <div class="p-4 flex flex-col flex-1">
        <h1 class="text-4xl font-bold mb-4">
          Slide in/out using view transition api
        </h1>
        <p>
          View transition api effectively takes a photo of the old state and
          animates it out. This can lead to the old page being visibly cut off
          if shrunk (by using CSS scale).
        </p>
        <IFrame src="/examples/slide-in" />
      </div>
    </div>
  );
}
