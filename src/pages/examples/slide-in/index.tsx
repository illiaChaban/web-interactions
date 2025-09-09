import { range } from "@illlia/ts-utils";
import { A, useNavigate } from "@solidjs/router";
import { JSX } from "solid-js";
import { ExitStandalone } from "~/components/iframe";
import { Page, Content } from "~/components/page";
import { s } from "~/utils/styles";
import { viewTransition } from "~/utils/view-transition";

export default function SlideIn() {
  const navigate = useNavigate();
  return (
    <ul class="flex flex-col gap-2 max-w-[600px]">
      {range(5).map((i) => {
        const href = `/examples/slide-in/${i + 1}`;
        return (
          <li>
            <A
              href={href}
              onClick={(e) => {
                e.preventDefault();
                // navigate(href);
                viewTransition("slide-in", () => navigate(href));
              }}
            >
              <CardContainer class="">card {i + 1}</CardContainer>
            </A>
          </li>
        );
      })}
    </ul>
  );
}

const CardContainer = s.div`p-4 border rounded-xl min-w-[200px] min-h-[200px] shadow-lg cursor-pointer`;

export const Layout = (p: { children: JSX.Element }) => {
  return (
    <Page>
      <Content>
        <ExitStandalone href="/list-transitions" />
        {p.children}
      </Content>
    </Page>
  );
};
