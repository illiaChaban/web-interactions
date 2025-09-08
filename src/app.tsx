import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createEffect, Suspense } from "solid-js";
import Nav from "~/presentation-components/nav";
import "./app.css";
import { Page } from "./components/page";
import { MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      {/* <Router root={RootRenderer}> */}
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}

const RootRenderer = (props) => {
  createEffect(() => {
    console.log("children changed", props.children);
  });
  return <Suspense>{props.children}</Suspense>;
};
