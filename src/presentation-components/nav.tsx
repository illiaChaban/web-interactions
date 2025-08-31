import { A, useLocation } from "@solidjs/router";
import { createEffect, For } from "solid-js";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  // createEffect(() => {
  //   console.log(location.pathname);
  // });
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200 gap-2">
        <For each={components}>
          {(component) => (
            <li class={`border-b-2 ${active(component.path)} mx-1.5 sm:mx-6`}>
              <A href={component.path}>{component.name}</A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}

const components = [
  { path: "/combobox", name: "Combobox" },
  { path: "/desktop-menu", name: "Desktop menu" },
];
