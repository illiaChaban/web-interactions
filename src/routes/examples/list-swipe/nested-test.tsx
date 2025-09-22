import { Content, Page } from "~/components/page";
import { For, JSX, onCleanup, onMount } from "solid-js";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { Dynamic } from "solid-js/web";
import { onEvent } from "@illlia/ts-utils";
import { useRef } from "~/utils/use-ref";
import X from "lucide-solid/icons/x";
import Check from "lucide-solid/icons/check";

export default function ListSwipe() {
  return (
    <Page>
      <Content>
        <h1 class="text-5xl mb-4">list swipe (clear)</h1>
        <ul class="-mx-4">
          {/* option 1 */}
          <li class="">
            <LiContent>nested value #1</LiContent>
            <ul class="pl-4">
              <For each={["more", "another", "another one"]}>
                {(text) => (
                  <li class="p-4 relative">
                    <div class="absolute inset bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)] [mask-image:linear-gradient(to_left,black,transparent)]" />
                    <span>{text}</span>
                  </li>
                )}
              </For>
            </ul>
          </li>

          {/* option 2 */}
          <li class="p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]">
            <span class="inline-block pb-2">nested value #2</span>
            <ul class="pl-4">
              <For each={["more", "another", "another one"]}>
                {(text) => (
                  <li class="p-4 -mr-4 relative group">
                    <div class="absolute inset bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)] [mask-image:linear-gradient(to_left,black,transparent)] group-last:hidden" />
                    <span>{text}</span>
                  </li>
                )}
              </For>
            </ul>
          </li>

          <For each={texts}>
            {(text) => (
              <li class="p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]">
                {text}
              </li>
            )}
          </For>
        </ul>
        <div class="fade-out-bar h-16 w-[100vw] -ml-4 -mb-4" />
      </Content>
    </Page>
  );
}

const LiContent = s.div`p-4 bg-[linear-gradient(to_top,#242e3bb5,transparent_30px)]`;

const texts = [
  "< 5km",
  "< $100",
  "popular",
  "recommended",
  "just in",
  "top rated",
  "lorem ipsum",
  "lorem ipsum dolor sit amet consectetur adipisicing elit",
  "lorem ipsum ",
  "lorem ipsum ",
  "lorem ipsum ",
];
