export const sweatyLog = (msg: string | Error) => {
  const fn = msg instanceof Error ? console.trace : console.log
  if (!msg) {
    return
  }
  fn(`SweatyDapp: ${(msg as Error).message || msg}`)
}
