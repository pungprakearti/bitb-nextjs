import cx from 'classnames'
import styles from './HWEnergy.module.scss'

type Props = {
  energy: number
}

const HWEnergy: React.FC<Props> = ({ energy }) => (
  <div className={cx(styles.wrap, { [styles.on]: energy > 0 })}>
    <div className={styles.inner}>
      <div className={styles.screen}>{energy > 0 ? `${energy}%` : ''}</div>
    </div>
  </div>
)

export default HWEnergy
