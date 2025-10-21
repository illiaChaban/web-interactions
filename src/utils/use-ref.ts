export type RefSetter<T = HTMLElement> = (el: T) => void;
export type Ref<T = HTMLElement> = RefSetter<T> & { current: T };

/** Workaround for type issues when passing ref variable */
export const useRef = <T extends HTMLElement>(el?: T): Ref<T> => {
  const fn = function (el: T): void {
    fn.current = el;
  } as Ref<T>;
  el && fn(el);
  return fn;
};
