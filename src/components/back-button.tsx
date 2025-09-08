import { A, useNavigate } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { s } from "~/utils/styles";
import type { JSX } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

export const BackButton = (p: {
  href: string;
  class?: string;
  children?: JSX.Element;
  onClick?: (
    e: MouseEvent & { currentTarget: HTMLAnchorElement; target: DOMElement }
  ) => void;
}) => {
  const navigate = useNavigate();
  return (
    <A
      class={s`btn btn-small btn-circle btn-soft my-2  ${p.class}`}
      href={p.href}
      onClick={(e) => {
        if (p.onClick) return p.onClick(e);
        e.preventDefault();
        navigate(-1);
      }}
    >
      {p.children ?? <ChevronLeft />}
    </A>
  );
};
