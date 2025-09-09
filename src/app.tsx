import { Router, Route } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createEffect, lazy, Suspense } from "solid-js";
import Nav from "~/presentation-components/nav";
import "./app.css";
import { Page } from "./components/page";
import { MetaProvider } from "@solidjs/meta";
import { Layout as SlideInLayout } from "./pages/examples/slide-in/layout";
import { Back } from "./components/back";

const withSuspence = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const ListTransitions = withSuspence(
  lazy(() => import("./routes/list-transitions"))
);
const SlideInWrapper = withSuspence(
  lazy(() => import("./pages/examples/slide-in/layout"))
);
const SlideIn = withSuspence(
  lazy(() => import("./pages/examples/slide-in/index"))
);
const SlideInDetails = withSuspence(
  lazy(() => import("./pages/examples/slide-in/[id]"))
);

export default function App() {
  return (
    <Router root={(p) => <Suspense>{p.children}</Suspense>}>
      <Route path="/list-transitions" component={ListTransitions} />
      <Route path="/examples">
        <Route path="/slide-in" component={SlideInWrapper}>
          <Route
            path="/"
            component={() => (
              <SlideInLayout>
                <SlideIn />
              </SlideInLayout>
            )}
          />
          <Route
            path="/:id"
            component={() => (
              <SlideInLayout>
                <Back href="/examples/slide-in" viewTransition="slide-out" />
                <SlideInDetails />
              </SlideInLayout>
            )}
          />
        </Route>
      </Route>
    </Router>
  );
}
