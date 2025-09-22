import { useNavigate, useParams } from "@solidjs/router";
import { JSX } from "solid-js";
import { Back } from "~/components/back";
import { ExitStandalone } from "~/components/iframe";
import { Page, Content } from "~/components/page";
import { viewTransition } from "~/utils/view-transition";
import { createResource } from "solid-js";

export default function SlideInDetails() {
  const params = useParams();
  const [value] = createResource<string>(
    () => new Promise((r) => setTimeout(() => r("hello world"), 5000))
  );
  // const value = () => "hi";

  return (
    <>
      <h1>Details page {params.id}</h1>
      {/* <p>{value()}</p> */}
    </>
  );
}
