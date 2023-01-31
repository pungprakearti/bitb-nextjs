const startInterval = (
  duration: number,
  ref: React.MutableRefObject<number>,
  callback: Function
) => {
  ref.current = window.setInterval(() => {
    callback()
  }, duration)
}

export default startInterval
