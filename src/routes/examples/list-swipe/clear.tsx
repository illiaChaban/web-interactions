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

const Clear = (() => {
  return (p: { nodes: Node[] }) => {
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

  function ClearChildren(p: { nodes: Node[] }) {
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
  }
})();

/** add box  */
const Clear2 = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046]">
        <h1 class="text-5xl mb-4 pt-4">Clear</h1>
        <Clear2Children nodes={p.nodes} level={0} class="-mx-4" />
      </Content>
    );
  };

  function Clear2Children(p: { nodes: Node[]; class?: string; level: number }) {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul class={s(" mt-2", p.class)}>
              <For each={p.nodes}>
                {(n, i) => (
                  <li
                    class={s(
                      "relative px-4 py-2 box-border /[box-shadow:0px_-15px_35px_rgb(0_0_0/5%)]",
                      p.level > 0 && "bg-white/5",
                      p.level > 0 && i() === 0 && "rounded-tl-lg",
                      p.level > 0 && i() === p.nodes.length - 1 && "rounded-bl-lg",
                      p.level > 0 && "-mr-4",
                    )}
                  >
                    {!n.children.length && i() !== p.nodes.length - 1 && (
                      <div class="inset absolute bg-[linear-gradient(to_top,#00000014,transparent_30px)] pointer-events-none" />
                    )}
                    {n.text}
                    <Clear2Children nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

/** add box-shadow */
const Clear3 = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046]">
        <h1 class="text-5xl mb-4 pt-4">Clear</h1>
        <Clear3Children nodes={p.nodes} level={0} class="-mx-4" />
      </Content>
    );
  };

  function Clear3Children(p: { nodes: Node[]; class?: string; level: number }) {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul
              class={s(
                " mt-2",
                p.level > 0 && "[box-shadow:-10px_0px_20px_rgb(0_0_0/22%))]",
                p.class,
              )}
            >
              <For each={p.nodes}>
                {(n, i) => (
                  <li
                    class={s(
                      "relative pl-4 py-2 box-border",
                      p.level > 0 && "bg-white/4",
                      p.level > 0 && i() === 0 && "rounded-tl-xl",
                      p.level > 0 && i() === p.nodes.length - 1 && "rounded-bl-xl",
                      // p.level > 0 && "-mr-4",
                    )}
                  >
                    {!n.children.length && i() !== p.nodes.length - 1 && (
                      <div class="inset absolute bg-[linear-gradient(to_top,#00000014,transparent_30px)] pointer-events-none" />
                    )}
                    <div class="pr-4">{n.text}</div>
                    <Clear3Children nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

/** add border */
const Clear4 = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046]">
        <h1 class="text-5xl mb-4 pt-4">Clear</h1>
        <Children nodes={p.nodes} level={0} class="-mx-4" />
      </Content>
    );
  };

  function Children(p: { nodes: Node[]; class?: string; level: number }) {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul
              class={s(
                " mt-2",
                p.level > 0 &&
                  "[box-shadow:-10px_0px_20px_rgb(0_0_0/22%))] border border-[#ffffff1a] rounded-l-xl",
                p.class,
              )}
            >
              <For each={p.nodes}>
                {(n, i) => (
                  <li
                    class={s(
                      "relative pl-4 py-2 box-border",
                      p.level > 0 && "bg-white/4",
                      p.level > 0 && i() === 0 && "rounded-tl-xl",
                      p.level > 0 && i() === p.nodes.length - 1 && "rounded-bl-xl",
                      // p.level > 0 && "-mr-4",
                    )}
                  >
                    {!n.children.length && i() !== p.nodes.length - 1 && (
                      <div class="inset absolute bg-[linear-gradient(to_top,#00000014,transparent_30px)] pointer-events-none" />
                    )}
                    <div class="pr-4">{n.text}</div>
                    <Children nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

/** remove background & light font weight */
const Clear5 = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046]">
        <h1 class="text-5xl mb-4 pt-4">Clear</h1>
        <Children nodes={p.nodes} level={0} class="-mx-4 font-light" />
      </Content>
    );
  };

  function Children(p: { nodes: Node[]; class?: string; level: number }) {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul
              class={s(
                " mt-2",
                p.level > 0 &&
                  "[box-shadow:-10px_0px_20px_rgb(0_0_0/22%))] border border-r-0 border-[#ffffff0f] rounded-l-xl",
                p.class,
              )}
            >
              <For each={p.nodes}>
                {(n, i) => (
                  <li
                    class={s(
                      "relative pl-4 py-2 box-border",
                      // p.level > 0 && "bg-white/2",
                      // p.level > 0 && i() === 0 && "rounded-tl-xl",
                      // p.level > 0 && i() === p.nodes.length - 1 && "rounded-bl-xl",
                      // p.level > 0 && "-mr-4",
                    )}
                  >
                    {!n.children.length && i() !== p.nodes.length - 1 && (
                      <div class="inset absolute bg-[linear-gradient(to_top,#00000014,transparent_30px)] pointer-events-none" />
                    )}
                    <div class="pr-4">{n.text}</div>
                    <Children nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

const Note = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046] font-light leading-snug">
        <h1 class="text-5xl mb-4 pt-4">Note</h1>
        <NoteChildren nodes={p.nodes} class="/-ml-4" />
      </Content>
    );
  };

  function NoteChildren(p: { nodes: Node[]; class?: string }): JSX.Element {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul class={s("list-outside pl-5 pt-1 -mb-1", p.class)}>
              <For each={p.nodes}>
                {(n) => (
                  <li class="relative py-1">
                    <div class="absolute left-[-18px] text-(--line-color)">•</div>
                    {/* vertical bar */}
                    {n.children.length > 0 && (
                      <div class="absolute left-[-15.25px] w-[1px] top-[15px] h-[calc(100%-7px)] bg-(--line-color)/50" />
                    )}
                    <span>{n.text}</span>
                    <NoteChildren nodes={n.children} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

const Note2 = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(25_30_37)] text-[#ebf9ff] py-0  [--line-color:#3b4046] font-light leading-snug">
        <h1 class="text-5xl mb-4 pt-4">Note 2</h1>
        <Note2Children nodes={p.nodes} class="-ml-4" level={0} />
      </Content>
    );
  };

  function Note2Children(p: { nodes: Node[]; class?: string; level: number }): JSX.Element {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul class={s("list-outside pl-5 pt-1 -mb-1", p.class)}>
              <For each={p.nodes}>
                {(n) => (
                  <li class="relative py-1">
                    {p.level > 0 && (
                      <>
                        <div class="absolute left-[-18px] text-(--line-color)">•</div>
                        {/* vertical bar */}
                        {n.children.length > 0 && (
                          <div class="absolute left-[-15.25px] w-[1px] top-[15px] h-[calc(100%-7px)] bg-(--line-color)/50" />
                        )}
                      </>
                    )}

                    {p.level === 0 && (
                      <>
                        <div class="absolute left-[-18px] text-(--line-color)">•</div>
                        {/* <div class="absolute left-[-23px] text-(--line-color)">-</div> */}
                      </>
                    )}

                    <span>{n.text}</span>
                    <Note2Children nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

const Android = (() => {
  return (p: { nodes: Node[] }) => {
    return (
      <Content class="bg-[rgb(22,26,32)] text-[#ebf9ff] py-0  [--line-color:#3b4046] font-light leading-snug">
        <h1 class="text-5xl mb-4 pt-4">Android</h1>
        <AndroidChildren nodes={p.nodes} class="-ml-4" level={0} />
      </Content>
    );
  };

  function AndroidChildren(p: { nodes: Node[]; class?: string; level: number }): JSX.Element {
    return (
      <>
        {p.nodes.length > 0 && (
          <>
            <ul
              class={s(
                "list-outside pt-1  rounded-l-2xl -mr-4 mt-2 ",
                p.class,
                // p.level === 1 && "divide-y divide-[rgb(25_30_37)]",
                // [0, 2].includes(p.level) && "divide-y divide-[rgb(34,41,50)]",
              )}
              data-level={p.level}
            >
              <For each={p.nodes}>
                {(n, i) => (
                  <li
                    class={s(
                      "relative py-1 pl-4 rounded-l-xs pr-4",
                      p.level % 2 ? "!bg-[rgb(25_30_37)]" : "bg-gray-400/10",
                      i() === 0 && "rounded-tl-2xl pt-2",
                      i() === p.nodes.length - 1 && "rounded-bl-2xl pb-2",
                      i() !== p.nodes.length - 1 && !n.children.length && "mb-[.5px]",
                    )}
                  >
                    <span>{n.text}</span>
                    <AndroidChildren nodes={n.children} level={p.level + 1} />
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </>
    );
  }
})();

const Apple = (() => {
  return (p: { nodes: Node[] }) => {
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

  function AppleChildren(p: { nodes: Node[]; class?: string }): JSX.Element {
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
  }
})();

const Views = {
  Clear,
  Clear2,
  Clear3,
  Clear4,
  Clear5,
  Note,
  Note2,
  Android,
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
  new Node(
    "recommended lorem ipsum dolor sit amet consectetur adipisicin sit amet consecteturg elit lor amet adipisicing elit",
  ),
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
      new Node("It's also about space", [new Node("nested")]),
      new Node("1320+ reviews; lorem ipsum dolor sit amet consectetur adipisicing "),
      new Node("7.7 IMDb", [
        new Node(
          "nested lorem ipsum dolor sit amet consectetur adipisicin sit amet consecteturg elit lor amet adipisicing elit",
        ),
      ]),
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
