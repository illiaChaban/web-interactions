import { _ } from "@illlia/ts-utils";
import { batch, For } from "solid-js";
import {
  AnimatedContainer,
  bouncyTransition,
} from "~/components/animated-container";
import { atom } from "~/utils/atom";
import { s } from "~/utils/styles";
import { useRef } from "~/utils/use-ref";

/**
 * TODO: update tooltip position logic to always fit on the screen?
 */
export default function DesktopMenu() {
  const ref = useRef<HTMLDivElement>();

  const hovered = atom<Menu | undefined>();
  const animatingOut = atom(false);
  const switchingMenu = atom(false);
  const tooltipPosition = atom<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  // Add initial position state to track position before animation
  const initialPosition = atom<{ top: number; left: number } | null>(null);

  let unhoveringTimeoutId: NodeJS.Timeout;
  let animatingOutTimeoutId: NodeJS.Timeout;

  // Calculate transform values based on current and initial positions
  const getTransform = () => {
    if (!initialPosition()) {
      return "";
    }

    const current = tooltipPosition();
    const initial = initialPosition()!;

    // Calculate the difference for transform
    const translateX = current.left - initial.left;
    const translateY = current.top - initial.top;

    return `translate(${translateX}px, ${translateY}px)`;
  };

  return (
    <div ref={ref} class="p-4 flex gap-6 w-full justify-center bg-neutral-50">
      <For each={menus}>
        {(menu) => (
          <ul>
            <li class="">
              <button
                class="p-2 cursor-pointer hover:bg-neutral-200 rounded-md "
                onMouseEnter={(e) => {
                  clearTimeout(unhoveringTimeoutId);
                  clearTimeout(animatingOutTimeoutId);

                  const buttonRect = e.currentTarget.getBoundingClientRect();

                  // Calculate safe position that keeps tooltip within viewport
                  const viewportWidth = window.innerWidth;
                  const viewportHeight = window.innerHeight;
                  const estimatedTooltipWidth = Math.max(buttonRect.width, 200); // Assume minimum tooltip width
                  const estimatedTooltipHeight = 300; // Rough estimate for tooltip height

                  // Ensure left position doesn't push tooltip off right edge
                  let safeLeft = buttonRect.left;
                  if (safeLeft + estimatedTooltipWidth > viewportWidth - 20) {
                    safeLeft = Math.max(
                      20,
                      viewportWidth - estimatedTooltipWidth - 20
                    );
                  }

                  // Ensure top position doesn't push tooltip off bottom edge
                  let safeTop = buttonRect.bottom + 8; // Default: 8px gap below button
                  if (safeTop + estimatedTooltipHeight > viewportHeight - 20) {
                    // Position above the button if not enough space below
                    safeTop = Math.max(
                      20,
                      buttonRect.top - estimatedTooltipHeight - 8
                    );
                  }

                  batch(() => {
                    // If this is the first hover, set initial position
                    if (!initialPosition()) {
                      initialPosition({ top: safeTop, left: safeLeft });
                    }

                    if (hovered()) switchingMenu(true);
                    hovered(menu);
                    animatingOut(false);
                    tooltipPosition({
                      top: safeTop,
                      left: safeLeft,
                      width: buttonRect.width,
                    });
                  });
                }}
                onMouseOut={() => {
                  unhoveringTimeoutId = setTimeout(() => {
                    animatingOut(true);
                    animatingOutTimeoutId = setTimeout(() => {
                      batch(() => {
                        switchingMenu(false);
                        animatingOut(false);
                        hovered(undefined);
                        // Reset initial position when menu is closed
                        initialPosition(null);
                      });
                    }, 200);
                  }, 100);
                }}
              >
                {menu.name}
              </button>
            </li>
          </ul>
        )}
      </For>
      {(!!hovered() || animatingOut()) && (
        <AnimatedContainer
          class={s`absolute animate-fadeIn ${
            animatingOut() && "animate-fadeOut delay-[100ms]"
          }`}
          style={{
            top: `${initialPosition()?.top || tooltipPosition().top}px`,
            left: `${initialPosition()?.left || tooltipPosition().left}px`,
            "min-width": `${tooltipPosition().width}px`,
            transform: getTransform(),
            transition: `${bouncyTransition}, transform 0.1s ease-in-out`,
          }}
        >
          {_(
            hovered(),
            (menu) =>
              menu && (
                <ul
                  class={s`p-4 ${
                    switchingMenu() &&
                    "animate-fadeIn [animation-delay:200ms] opacity-0"
                  }`}
                >
                  <For each={menu.elements}>
                    {(element) => <li>{element}</li>}
                  </For>
                </ul>
              )
          )}
        </AnimatedContainer>
      )}
    </div>
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
