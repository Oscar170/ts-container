import { ImportToDefault, ServicesShape } from "./AuxTypes";
export { toFakeImport, toImportDefault } from "./importerUtils";

const Container = {
  of: <Services extends ServicesShape>(services: Services) => {
    return {
      get: <Key extends keyof Services>(
        key: Key
      ): ImportToDefault<ReturnType<Services[Key]>> =>
        services[key]().then((mod) => mod.default),
    };
  },
};

export default Container;
