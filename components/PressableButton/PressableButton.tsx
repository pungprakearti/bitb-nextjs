import cx from 'classnames'
import styles from './PressableButton.module.scss'

type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  text?: string
  power?: 'on' | 'dim' | 'off'
  dir?: boolean
}

const PressableButton: React.FC<Props> = ({
  handleClick,
  text = '',
  power = 'off',
  dir = false,
}) => (
  <div
    className={cx(styles.buttonSpaceWrap, styles[power], { [styles.dir]: dir })}
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
