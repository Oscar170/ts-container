export type Fn = (...args: any) => any;

export type ImportToDefault<T extends Promise<{ default: Fn }>> = Promise<
  Awaited<T>["default"]
>;
export type Module = () => Promise<{ default: Fn }>;
export type ServicesShape = { [key: string]: Module };
