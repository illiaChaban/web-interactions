import { A, useLocation, useNavigate, useParams } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { s } from "~/utils/styles";
import type { JSX } from "solid-js";
import { viewTransition, ViewTransitionAnimation } from "~/utils/view-transition";
import { overrideLinkClick } from "~/utils/override-link-click";

export const Back = (p: {
  href: string;
  class?: string;
  children?: JSX.Element;
  viewTransition?: ViewTransitionAnimation;
}) => {
  const navigate = useNavigate();
  return (
    <A
      class={s`btn btn-lg btn-square btn-ghost ${p.class}`}
      href={p.href}
      onClick={overrideLinkClick(() => {
        if (p.viewTransition) {
          viewTransition(p.viewTransition, () => navigate(-1));
        } else {
          navigate(-1);
        }
      })}
    >
      {p.children ?? <ChevronLeft />}
    </A>
  );
};

export const BackFromState = (p: { href: string }) => {
  const { state } = useLocation<{
    backwardTransition?: ViewTransitionAnimation;
  }>();
  return <Back href={p.href} viewTransition={state?.backwardTransition} />;
};
