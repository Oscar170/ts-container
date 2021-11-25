type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type ImportToDefault<T extends Promise<{ default: Function }>> = Promise<
  Awaited<T>["default"]
>;

type ServicesShape = { [key: string]: () => Promise<{ default: Function }> };

export const toFakeImport = <T extends Function>(fn: T) => () =>
  Promise.resolve({ default: fn });
export const toImportDefault = <Mod, Key extends keyof Mod>(
  factory: () => Promise<Mod>,
  keyToDefault: Key
) => () => factory().then((mod) => ({ default: mod[keyToDefault] }));

const Container = {
  of: <Services extends ServicesShape>(services: Services) => {
    return {
      get: <Key extends keyof Services>(
        key: Key
      ): ImportToDefault<ReturnType<Services[Key]>> =>
        services[key]().then((mod) => mod.default)
    };
  }
};

export default Container;
