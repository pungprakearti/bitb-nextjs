import { useEffect, useState } from 'react'
import HWEnergy from '@/components/HWEnergy'
import HWPanel from '@/components/HWPanel'
import HWScreen from '@/components/HWScreen'
import HWSelector from '@/components/HWSelector'
import styles from './Hardware.module.scss'

const Hardware: React.FC = () => {
  const [mainPowerOn, setMainPowerOn] = useState(false)
  const [energy, setEnergy] = useState(0)
  const [curText, setCurText] = useState(0)
  const [incText, setIncText] = useState<string[]>([])
  const [proText, setProText] = useState<JSX.Element[]>([])

  const textOpAndData = {
    incText: incText,
    setIncText: setIncText,
    proText: proText,
    setProText: setProText,
  }

  const screenText = [
    'You did it!',
    'You got this [link=https://github.com/pungprakearti/bitb-nextjs]rig[/link] running.',
    'What else can you discover?',
  ]

  useEffect(() => {
    setIncText(screenText)
  }, [])

  // Toggle on and off main power. This resets everything
  const handleMainPower = (turnOn: boolean) => {
    if (turnOn) {
      setEnergy(100) // for testing
      setIncText(screenText)
      return setMainPowerOn(true)
    }

    setEnergy(0)
    setProText([<></>])
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
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <HWScreen
            energy={energy}
            addEnergy={addEnergy}
            curText={curText}
            screenText={screenText}
            textOpAndData={textOpAndData}
          />
        </div>
        <div className={styles.topRight}>
          <HWSelector
            energy={energy}
            addEnergy={addEnergy}
            mainPowerOn={mainPowerOn}
            curText={curText}
            setCurText={setCurText}
          />
          <HWEnergy energy={energy} />
        </div>
      </div>
      <HWPanel
        handleMainPower={handleMainPower}
        addEnergy={addEnergy}
        energy={energy}
      />
    </div>
  )
}

export default Hardware
