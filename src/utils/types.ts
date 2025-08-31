export type Override<T extends {}, U extends { [K in keyof T]?: any }> = Omit<
  T,
  keyof U
> &
  U;
