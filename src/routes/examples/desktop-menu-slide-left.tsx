import ChevronLeft from "lucide-solid/icons/chevron-left";
import Menu from "lucide-solid/icons/menu";
import { For } from "solid-js";
import { Page } from "~/components/page";
import { atom } from "~/utils/atom";
import { toggle } from "@illlia/ts-utils";
import { loremIpsum } from "~/mocks/lorem-ipsum";
import { s } from "~/utils/styles";
import type { JSX } from "solid-js";

export default function DesktopMenuSlideLeft() {
  const expanded = atom(false);
  const activeMenu = atom(menus[0]);

  return (
    <Page>
      <div
        class={s`inset-0 relative bg-slate-50 h-full grid overflow-clip ${
          expanded() ? "grid-cols-[200px_auto]" : "grid-cols-[32px_auto]"
        } transition-all duration-[250ms] ease-in-out`}
      >
        <nav
          class={s`bg-slate-300 border-r p-1 flex flex-col justify-start box-border transition-all`}
        >
          <button
            class={s`self-end`}
            onClick={() => {
              expanded(toggle);
            }}
          >
            {expanded() ? <ChevronLeft /> : <Menu />}
          </button>
          {expanded() && (
            <ul class="px-4 mt-4 animate-fadeIn">
              <For each={menus}>
                {(m) => (
                  <li>
                    <button
                      class={s(activeMenu() === m && "underline", "text-2xl")}
                      onClick={() => {
                        activeMenu(m);
                        expanded(false);
                      }}
                    >
                      {m.name}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          )}
        </nav>
        <div class="p-2 flex-1 relative transform min-w-[calc(100vw-32px)]">
          <h1 class="text-4xl font-bold mb-2">{activeMenu().name}</h1>
          {loremIpsum}
        </div>
      </div>
    </Page>
  );
}

const menus = [
  {
    name: "Clothing",
    elements: [
      "Top Rated Clothing",
      "Bestsellers",
      "New in",
      "T-Shirts & Tanks",
      "Polo shirts",
      "Shirts",
      "Shorts",
      "Pants & Chinos",
      "Jeans",
      "Suits",
      "Swimwear",
      "Hoodies & Sweatshirts",
    ],
  },
  {
    name: "Shoes",
    elements: [
      "Top Rated Shoes",
      "Bestselling Shoes",
      "View all",
      "New in",
      "Sneakers",
      "Boots",
      "Loafers",
      "Dress shoes",
    ],
  },
  {
    name: "Brands",
    elements: ["Abercrombie & Fitch", "adidas", "Bershka", "Mango"],
  },
];

type Menu = (typeof menus)[0];
