import { range } from "@illlia/ts-utils";
import { A, useNavigate } from "@solidjs/router";
import { Page } from "~/components/page";
import { s } from "~/utils/styles";
import { Style } from "@solidjs/meta";
import { ExitStandalone } from "~/components/iframe";

export default function SlideIn() {
  const navigate = useNavigate();
  return (
    <div>
      <Page class="bg-gray-200">
        <ExitStandalone href="/list-transitions" />
        <ul class="flex flex-col gap-2 max-w-[600px]">
          {range(5).map((i) => (
            <li>
              <A
                href={`/examples/slide-in/${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.startViewTransition(() => {
                    navigate(`/examples/slide-in/${i + 1}`);
                  });
                }}
              >
                <CardContainer class="">card {i + 1}</CardContainer>
              </A>
            </li>
          ))}
        </ul>
      </Page>
    </div>
  );
}

const CardContainer = s.div`p-4 border rounded-xl min-w-[200px] min-h-[200px] bg-white cursor-pointer`;
