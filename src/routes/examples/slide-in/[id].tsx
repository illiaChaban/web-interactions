import { range } from "@illlia/ts-utils";
import { Page } from "~/components/page";
import { s } from "~/utils/styles";
import { useParams } from "@solidjs/router";
import { Style } from "@solidjs/meta";
import { ExitStandalone } from "~/components/iframe";
import { BackButton } from "~/components/back-button";
import { useNavigate } from "@solidjs/router";

export default function SlideInDetails() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Page class="bg-gray-200">
        <ExitStandalone href="/list-transitions" />
        <BackButton href="/examples/slide-in" />
        <h1>Details page {params.id}</h1>
      </Page>
    </div>
  );
}
