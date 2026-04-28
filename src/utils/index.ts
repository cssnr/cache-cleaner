export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  timeout = 250,
) {
  let timeoutID: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn(...args), timeout)
  }
}
