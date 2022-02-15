# Service Container

Is a simple container to register modules and import them on demand, preserving the typing.

```js
import Container, { toFakeImport, toImportDefault } from "service-container";
import { increment } from "./increment";
// load module

const container = Container.of({
  sum: () => import('./sum'),
  // dynamic import
  sqrt: toImportDefault(() => import('./sqrt'), 'sqrt'),
  // dynamic named import
  increment: toFakeImport(increment),
  // wrapper to fake module
});

container.get('sum').then(sum => sum(42, 42))

```
