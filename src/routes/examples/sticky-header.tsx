import { Back } from "~/components/back";
import { Content, Page } from "~/components/page";
import { StickyHeader } from "~/components/sticky-header";
import { loremIpsum } from "~/mocks/lorem-ipsum";
import { useRef } from "~/utils/use-ref";
import Share from "lucide-solid/icons/share";

export default function StickyHeaderPage() {
  const pageRef = useRef();

  return (
    <Page ref={pageRef}>
      <StickyHeader
        left={<Back href="/" />}
        right={
          <button class="btn btn-lg btn-square btn-ghost">
            <Share class="size-6" />
          </button>
        }
        getContainer={() => pageRef.current}
      >
        Compact + Mid-Size Cars + Other cars
      </StickyHeader>

      <Content class="pt-0 mt-4">
        <p>
          {loremIpsum}
          {loremIpsum}
          {loremIpsum}
        </p>
      </Content>
    </Page>
  );
}
