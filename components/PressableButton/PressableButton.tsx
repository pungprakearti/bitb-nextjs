import { PowerStatus } from 'types'
import cx from 'classnames'
import styles from './PressableButton.module.scss'

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
}) => (
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
      <button className={styles.button} onClick={handleClick}>
        {text}
      </button>
    </div>
  </div>
)

export default PressableButton
