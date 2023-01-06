import HWScreen from '@/components/HWScreen'
import HWSelector from '@/components/HWSelector'
import HWEnergy from '@/components/HWEnergy'
import HWPanel from '@/components/HWPanel'
import styles from './Hardware.module.scss'

const Hardware: React.FC = () => (
  <div className={styles.wrap}>
    <HWScreen />
    <HWSelector />
    <HWEnergy />
    <HWPanel />
  </div>
)

export default Hardware
