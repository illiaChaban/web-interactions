import { Route, Router } from "@solidjs/router";
import { Component, lazy, onCleanup, onMount, Suspense } from "solid-js";
import "./app.css";
import { Back, BackFromState } from "./components/back";
import { PageExampleLayout } from "./components/page";
import { ExitStandalone } from "./components/iframe";
import { onEvent } from "@illlia/ts-utils";
import { FileRoutes } from "@solidjs/start/router";

const SlideIn = withSuspence(lazy(() => import("./routes-special/slide-in/index")));
const SlideInDetails = withSuspence(lazy(() => import("./routes-special/slide-in/[id]")));

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
      {/* separate routes for special suspense examples (https://github.com/solidjs/solid-router/issues/544) */}
      <Route path="/examples/slide-in">
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
              <BackFromState href="/examples/slide-in" />
              <SlideInDetails />
            </PageExampleLayout>
          )}
        />
      </Route>

      <FileRoutes />
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

/** TODO */
const ScrollRestoration = () => {
  onMount(() => {
    const scroll = [];

    onCleanup(
      onEvent(window, "pushstate", () => {
        console.debug("pushstate");
      }),
    );

    onCleanup(
      onEvent(window, "popstate", () => {
        console.debug("popstate");
      }),
    );
  });
  return null;
};
