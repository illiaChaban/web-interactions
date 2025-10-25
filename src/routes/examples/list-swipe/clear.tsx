import { _ } from "@illlia/ts-utils";
import { useSearchParams } from "@solidjs/router";
import { For } from "solid-js";
import { Content, Page } from "~/components/page";
import { s } from "~/utils/styles";

export default () => {
  const [params, setSearchParams] = useSearchParams<{ view?: View; text?: EText }>();
  const view = (): View => params.view || "Clear";
  const setView = (v: View) => setSearchParams({ view: v });

  const texts = (): EText => params.text || EText.Default;
  const setTexts = (v: EText) => setSearchParams({ text: v });

  const nodes = () => (texts() === EText.Quotes ? quotes : texts1);

  return (
    <>
      <Page class="bg-black">
        {_(Views[view()], (View) => (
          <View nodes={nodes()} />
        ))}
      </Page>
      <Controls view={view()} setView={setView} texts={texts()} setTexts={setTexts} />
    </>
  );
};

enum EText {
  Default = "Default",
  Quotes = "Quotes",
}

const Clear = (p: { nodes: Node[] }) => {
  return (
    <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046]">
      <h1 class="text-5xl mb-4 pt-4">Clear</h1>
      <ul class="-mx-4 overflow-x-hidden">
        <For each={p.nodes}>
          {(n) => (
            <li class="relative px-4 py-2 /[box-shadow:0px_-15px_35px_rgb(0_0_0/5%)]">
              <div class="inset absolute bg-[linear-gradient(to_top,#00000014,transparent_30px)] pointer-events-none" />
              {n.text}
              <ClearChildren nodes={n.children} />
            </li>
          )}
        </For>
      </ul>
    </Content>
  );
};

const ClearChildren = (p: { nodes: Node[] }) => {
  return (
    <>
      {p.nodes.length > 0 && (
        <>
          {/* <div class="absolute w-[1px] h-[calc(100%-48px)] bg-(--line-color)/50" /> */}
          <ul class="list-outside pl-4 pt-1 -mb-1">
            <For each={p.nodes}>
              {(n) => (
                <li class="relative py-1">
                  <div class="absolute left-[-19.5px] text-(--line-color)">•</div>
                  {n.text}
                  <ClearChildren nodes={n.children} />
                </li>
              )}
            </For>
          </ul>
        </>
      )}
    </>
  );
};

const Clear2 = (p: { nodes: Node[] }) => {
  return (
    <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046] font-light">
      <h1 class="text-5xl mb-4 pt-4">Clear</h1>
      <ClearChildren nodes={p.nodes} />
    </Content>
  );
};

const Apple = (p: { nodes: Node[] }) => {
  return (
    <Content class="bg-[#1c1c1e] min-h-full text-[#dcdcdc] py-0 font-light">
      <h1 class="text-5xl mb-4 pt-4">Apple</h1>
      <AppleChildren
        nodes={p.nodes}
        // first level offset
        class="-ml-2"
      />
    </Content>
  );
};

const AppleChildren = (p: { nodes: Node[]; class?: string }) => {
  return (
    <>
      {p.nodes.length > 0 && (
        <>
          <ul class={s("list-outside pl-2", p.class)}>
            <For each={p.nodes}>
              {(n) => (
                <li class="relative py-0 pl-3">
                  <div class="absolute left-0">-</div>
                  {n.text}
                  <AppleChildren nodes={n.children} />
                </li>
              )}
            </For>
          </ul>
        </>
      )}
    </>
  );
};

const Views = {
  Clear,
  Clear2,
  Apple,
} as const;
type View = keyof typeof Views;

class Node {
  constructor(public text: string, public children: Node[] = []) {}
}

const texts1 = [
  new Node("< 5km"),
  new Node("< $100"),
  new Node("popular"),
  new Node("recommended"),
  new Node("just in"),
  new Node("top rated"),
  new Node("movies to watch", [
    new Node("Once upon a time in Hollywood"),
    new Node("One flew over the cuckoos nest"),
    new Node("Gravity"),
    new Node("Birdman"),
    new Node(
      "lorem ipsum dolor sit amet consectetur adipisicin sit amet consecteturg elit lor amet adipisicing elit",
    ),
    new Node("The office space", [
      new Node("It's about office"),
      new Node("It's also about space"),
      new Node("1320+ reviews"),
      new Node("7.7 IMDb"),
    ]),
    new Node("The champion"),
    new Node("Face off"),
    new Node("The grand Budapest hotel"),
    new Node("Year one lorem ipsum dolor sit amet consectetur adipisicin sit"),
  ]),
  new Node("lorem ipsum"),
  new Node("lorem ipsum dolor sit amet consectetur adipisicing elit"),
  new Node("lorem ipsum "),
  new Node("lorem ipsum "),
  new Node("lorem ipsum "),
];

const quotes = [
  "anything can be learned. I can start playing gold like tiger woods. The only thing that separates me from tiger woods is desire and repetition. Someone can guide you, but you have to want it yourself and you have to teach yourself.",
  "talent is a pursued interest",
  "Let’s never forget the value of being the last man standing",
  "when a man cannot find a deep sense of meaning, they distract themselves with pleasure",
  "when you’re dying, likes, status, money don’t matter. What matters is whether you lived on your own terms",
  "if your life is more important than your principles, you sacrifice your principles. If your principles are more important than your life, you sacrifice your life.",
  "professional athletes mental strategies: (all consuming commitment,) setting clearly defined goals, visualizing themselves performing flawlessly, and repeating affirmations that crowded out all doubts and fears until they were replaced with unshakable self belief",
  "what if laziness is a habit of thinking about effort/cost instead of thinking about payoff",
  "if you can’t decide, it’s a no",
  "pain is where purpose lives",
  "Go work for someone you admire the most. You’ll jump out of the bed",
].map((v) => new Node(v));

const Controls = (p: {
  view: View;
  setView: (v: View) => void;
  texts: EText;
  setTexts: (v: EText) => void;
}) => (
  <div class="fixed bottom-2 right-2 flex join px-2">
    <select
      class="select join-item"
      name="texts"
      onChange={(e) => p.setTexts(e.target.value as EText)}
    >
      {[EText.Default, EText.Quotes].map((v) => (
        <option value={v} selected={p.texts === v}>
          {v}
        </option>
      ))}
    </select>
    <select
      class="select join-item"
      name="view"
      onChange={(e) => p.setView(e.target.value as View)}
    >
      {Object.keys(Views).map((v) => (
        <option value={v} selected={p.view === v}>
          {v}
        </option>
      ))}
    </select>
  </div>
);

// bg #1c1c1e
// color #dcdcdc
// primary #ebb900
