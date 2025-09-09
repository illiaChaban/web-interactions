import { A, useNavigate } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { s } from "~/utils/styles";
import type { JSX } from "solid-js";
import {
  viewTransition,
  ViewTransitionAnimation,
} from "~/utils/view-transition";

export const Back = (p: {
  href: string;
  class?: string;
  children?: JSX.Element;
  viewTransition?: ViewTransitionAnimation;
}) => {
  const navigate = useNavigate();
  return (
    <A
      class={s`btn btn-small btn-circle btn-soft my-2  ${p.class}`}
      href={p.href}
      onClick={(e) => {
        e.preventDefault();

        if (p.viewTransition) {
          viewTransition(p.viewTransition, () => navigate(-1));
        } else {
          navigate(-1);
        }
      }}
    >
      {p.children ?? <ChevronLeft />}
    </A>
  );
};
