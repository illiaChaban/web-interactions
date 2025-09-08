import { RouteSectionProps } from "@solidjs/router";

export default function SlideInLayout(props: RouteSectionProps) {
  return (
    <div>
      <style>{`
        @keyframes slide-in {
          from {
            translate: 100vw 0;
          }
        }

        @keyframes slide-out {
          to {
            translate: 100vw 0;
          }
        }

        @keyframes shrink {
          to {
            scale: 0.98;
          }
        }

        @keyframes grow {
          from {
            scale: 0.98;
          }
        }

        ::view-transition-group(root) {
          animation-duration: 0s;
          animation-name: none;
        }

        :root[data-transition="slide-in"] {
          &::view-transition-old(root),
          &::view-transition-new(root) {
            animation-duration: 0.35s;
            animation-name: none;
          }

          &::view-transition-old(root) {
            animation-timing-function: linear;
            animation-name: shrink;
            transform-origin: bottom;
          }

          &::view-transition-new(root) {
            animation-timing-function: var(--ease-out-cubic);
            animation-name: slide-in;
          }
        }

        :root[data-transition="slide-out"] {
          &::view-transition-old(root),
          &::view-transition-new(root) {
            animation-duration: 0.35s;
            animation-name: none;
          }

          &::view-transition-new(root) {
            animation-timing-function: ease-out;
            animation-name: grow;
            transform-origin: bottom;
          }

          &::view-transition-old(root) {
            animation-timing-function: var(--ease-out-cubic);
            animation-name: slide-out;
            z-index: 1;
          }
        }
      `}</style>
      {props.children}
    </div>
  );
}
