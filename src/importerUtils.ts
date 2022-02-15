import { Fn } from "./AuxTypes";

export const toFakeImport =
  <T extends Fn>(fn: T) =>
  () =>
    Promise.resolve({ default: fn });

export const toImportDefault =
  <Mod, Key extends keyof Mod>(
    factory: () => Promise<Mod>,
    keyToDefault: Key
  ) =>
  () =>
    factory().then((mod) => ({ default: mod[keyToDefault] }));
