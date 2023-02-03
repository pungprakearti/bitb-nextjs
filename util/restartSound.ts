// Restart sound so that if activated will play a sound instead of waiting for sound to finish
const restartSound = (ref: React.RefObject<HTMLAudioElement>) => {
  if (ref.current && ref.current.currentTime > 0 && !ref.current.paused) {
    ref.current.pause()
    ref.current.currentTime = 0
  }

  ref?.current?.play()
}

export default restartSound
