import { Route, Router } from "@solidjs/router";
import { Component, lazy, onCleanup, onMount, Suspense } from "solid-js";
import "./app.css";
import { Back } from "./components/back";
import { PageExampleLayout } from "./components/page";
import { ExitStandalone } from "./components/iframe";
import { onEvent } from "@illlia/ts-utils";

const ListTransitions = withSuspence(
  lazy(() => import("./routes/list-transitions"))
);

const SlideIn = withSuspence(
  lazy(() => import("./routes/examples/slide-in/index"))
);
const SlideInDetails = withSuspence(
  lazy(() => import("./routes/examples/slide-in/[id]"))
);

const Components = withSuspence(lazy(() => import("./routes/components")));

const Combobox = withSuspence(lazy(() => import("./routes/examples/combobox")));

const MenuPatterns = withSuspence(lazy(() => import("./routes/menu-patterns")));

const DesktopMenu = withSuspence(
  lazy(() => import("./routes/examples/desktop-menu"))
);
const DesktopMenuSlideLeft = withSuspence(
  lazy(() => import("./routes/examples/desktop-menu-slide-left"))
);

export default function App() {
  return (
    <Router
      root={(p) => (
        <>
          <Suspense>{p.children}</Suspense>
          <ScrollRestoration />
        </>
      )}
    >
      <Route path="/list-transitions" component={ListTransitions} />
      <Route path="/components" component={Components} />
      <Route path="/menu-patterns" component={MenuPatterns} />
      <Route path="/examples">
        <Route path="/slide-in">
          <Route
            path="/"
            component={() => (
              <PageExampleLayout href="/list-transitions">
                <SlideIn />
              </PageExampleLayout>
            )}
          />
          <Route
            path="/:id"
            component={() => (
              <PageExampleLayout href="/list-transitions">
                <Back href="/examples/slide-in" viewTransition="slide-out" />
                <SlideInDetails />
              </PageExampleLayout>
            )}
          />
        </Route>
        {/* todo: does it need to be a standalone url? */}
        <Route
          path="/combobox"
          component={() => (
            <>
              <ExitStandalone href="/components" />
              <Combobox />
            </>
          )}
        />

        <Route path="/desktop-menu" component={DesktopMenu} />
        <Route
          path="/desktop-menu-slide-left"
          component={DesktopMenuSlideLeft}
        />
      </Route>
    </Router>
  );
}

/** hack since top-level suspence doesn't do anything */
function withSuspence(Component: Component) {
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

const ScrollRestoration = () => {
  onMount(() => {
    const scroll = [];

    onCleanup(
      onEvent(window, "pushstate", () => {
        console.debug("pushstate");
      })
    );

    onCleanup(
      onEvent(window, "popstate", () => {
        console.debug("popstate");
      })
    );
  });
  return null;
};
