import { range } from "@illlia/ts-utils";
import { A, useNavigate } from "@solidjs/router";
import { JSX } from "solid-js";
import { ExitStandalone } from "~/components/iframe";
import { Page, Content } from "~/components/page";
import { ImagePlaceholder } from "~/icons";
import { s } from "~/utils/styles";
import { viewTransition } from "~/utils/view-transition";

export default function SlideIn() {
  const navigate = useNavigate();
  return (
    <>
      <h1 class="text-5xl mb-8">Long list</h1>
      <ul class="flex flex-col gap-4 ">
        {range(10).map((i) => {
          const href = `/examples/slide-in/${i + 1}`;
          return (
            <li>
              <A
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  viewTransition("slide-in", () => navigate(href));
                }}
              >
                <CardContainer class="flex gap-4 overflow-hidden">
                  <ImagePlaceholder class="size-40 -ml-4 -my-4 opacity-75" />
                  <div class="flex flex-col gap-2">
                    <h2 class="text-xl">Title {i + 1}</h2>
                    <div class="badge badge-sm badge-outline badge-accent">
                      badge
                    </div>
                    <div class="text-sm text-base-content/75 mt-auto">
                      Seattle, 30000
                    </div>
                  </div>
                </CardContainer>
              </A>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const CardContainer = s.div`p-4 bg-base-300 rounded-xl min-w-[200px] min-h-[150px] shadow-xl cursor-pointer`;

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
