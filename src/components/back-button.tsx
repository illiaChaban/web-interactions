import { A, useNavigate } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { s } from "~/utils/styles";
import type { JSX } from "solid-js";

export const BackButton = (p: {
  href: string;
  class?: string;
  children?: JSX.Element;
}) => {
  const navigate = useNavigate();
  return (
    <A
      class={s`bg-gray-300 border p-2 mb-2 inline-block ${p.class}`}
      href={p.href}
      onClick={(e) => {
        e.preventDefault();
        document.startViewTransition(() => {
          navigate(-1);
        });
      }}
    >
      {p.children ?? <ChevronLeft />}
    </A>
  );
};
