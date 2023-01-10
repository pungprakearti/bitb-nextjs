import styles from './HWEnergy.module.scss'

type Props = {
  energy: number
}

const HWEnergy: React.FC<Props> = ({ energy }) => (
  <div className={styles.wrap}>{energy > 0 ? `${energy}%` : ''}</div>
)

export default HWEnergy
