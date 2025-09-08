import { useNavigate, useParams } from "@solidjs/router";
import { BackButton } from "~/components/back-button";
import { ExitStandalone } from "~/components/iframe";
import { Page, Content } from "~/components/page";
import { viewTransition } from "~/utils/view-transition";

export default function SlideInDetails() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Page class="">
        <Content>
          <ExitStandalone href="/list-transitions" />
          <BackButton
            href="/examples/slide-in"
            onClick={(e) => {
              e.preventDefault();
              viewTransition("slide-out", () => navigate(-1));
            }}
          />
          <h1>Details page {params.id}</h1>
        </Content>
      </Page>
    </div>
  );
}
