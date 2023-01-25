import { useState } from 'react'
import HWEnergy from '@/components/HWEnergy'
import HWPanel from '@/components/HWPanel'
import HWScreen from '@/components/HWScreen'
import HWSelector from '@/components/HWSelector'
import styles from './Hardware.module.scss'

const Hardware: React.FC = () => {
  const [mainPowerOn, setMainPowerOn] = useState(false)
  const [energy, setEnergy] = useState(0)

  // Toggle on and off main power. This resets everything
  const handleMainPower = (turnOn: boolean) => {
    if (turnOn) {
      setEnergy(1)
      return setMainPowerOn(true)
    }

    setEnergy(0)
    return setMainPowerOn(false)
  }

  // Add or subtract energy from components
  const addEnergy = (amount: number) => {
    const temp = energy + amount
    if (temp < 0) setEnergy(0)
    else setEnergy(energy + amount)
  }

  return (
    <div className={styles.wrap}>
      <HWScreen />
      <HWSelector />
      <HWEnergy energy={energy} />
      <HWPanel
        handleMainPower={handleMainPower}
        addEnergy={addEnergy}
        energy={energy}
      />
    </div>
  )
}

export default Hardware
