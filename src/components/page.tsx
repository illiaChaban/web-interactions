import { s } from "~/utils/styles";
import { JSX } from "solid-js";
import { ExitStandalone } from "~/components/iframe";

/**
 * Other useful properties best provided globally
 * scroll-behavior: smooth;
 * scroll-padding-block: 16px */
export const Page = s.div`fixed overflow-auto inset-0 contain-strict`;

export const Content = s.div`p-4 max-w-3xl mx-auto`;

/** page example layout */
export const PageExampleLayout = (p: {
  children: JSX.Element;
  href: string;
}) => {
  return (
    <Page>
      <Content>
        <ExitStandalone href={p.href} />
        {p.children}
      </Content>
    </Page>
  );
};
