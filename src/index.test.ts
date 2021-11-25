import Container, { toFakeImport, toImportDefault } from './index';

test('[Container] should return the demanded module', async () => {
  const fn = jest.fn()
  const factory = jest.fn(() => Promise.resolve({ default: fn }))

  const container = Container.of({ some: factory })

  const some = await container.get('some')

  expect(factory).toBeCalled()
  expect(some).toEqual(fn)
})

test('[toFakeImport] should wrap function to fake export default', async () => {
  const fn = jest.fn()
  const factory = toFakeImport(fn)

  const fakeMod = await factory()

  expect(fakeMod.default).toEqual(fn)
})

test('[toImportDefault] should convert the named export to export default', async () => {
  const sum = jest.fn()
  const mathMod = () => Promise.resolve({ sum })
  const factory = toImportDefault(mathMod, 'sum')

  const fakeMod = await factory()

  expect(fakeMod.default).toEqual(sum)
})