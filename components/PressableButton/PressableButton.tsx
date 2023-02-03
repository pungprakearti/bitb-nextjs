import { PowerStatus } from 'types'
import { useRef } from 'react'
import cx from 'classnames'
import styles from './PressableButton.module.scss'
import restartSound from '@/util/restartSound'

type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  text?: string
  power?: PowerStatus
  type?: 'def' | 'dir' | 'sel' | 'sel-enter' | 'scr' | 'scr-power'
}

const PressableButton: React.FC<Props> = ({
  handleClick,
  text = '',
  power = 'off',
  type = 'def',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const clickWrapper = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleClick(e)

    // If sound is playing, stop sound before playing again.
    // This makes it so you can click really fast and still get sound
    restartSound(audioRef)
    // if (
    //   audioRef.current &&
    //   audioRef.current.currentTime > 0 &&
    //   !audioRef.current.paused
    // ) {
    //   audioRef.current.pause()
    //   audioRef.current.currentTime = 0
    // }

    // audioRef?.current?.play()
  }

  return (
    <div
      className={cx(
        styles.buttonSpaceWrap,
        styles[power],
        {
          [styles.dir]: type === 'dir',
        },
        {
          [styles.sel]: type === 'sel' || type === 'sel-enter',
        },
        {
          [styles.selEnter]: type === 'sel-enter',
        },
        {
          [styles.scr]: type === 'scr',
        },
        {
          [styles.scrPower]: type === 'scr-power',
        }
      )}
    >
      <div className={styles.buttonSpace} />
      <div className={styles.buttonOuter}>
        <div className={styles.buttonTop} />
        <button className={styles.button} onClick={clickWrapper}>
          {text}
        </button>
      </div>
      <audio src='/click.mp3' ref={audioRef} />
    </div>
  )
}

export default PressableButton
