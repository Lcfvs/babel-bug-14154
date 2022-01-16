export default (
  selector,
  target = globalThis.document
) => {
  return [
    ...target.querySelectorAll(selector)
  ]
}
