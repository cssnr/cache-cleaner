// noinspection JSUnusedGlobalSymbols

declare namespace chrome.scripting {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface InjectionResult<T> {
    error?: unknown
  }
}

declare namespace chrome.sidebarAction {
  function open(): void
}
