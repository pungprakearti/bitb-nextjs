import { useState, useEffect } from 'react'
import { PowerStatus } from 'types'
import PressableButton from '../PressableButton'
import styles from './HWSelector.module.scss'

type Props = {
  energy: number
  addEnergy: Function
  mainPowerOn: boolean
}

const HWSelector: React.FC<Props> = ({ energy, addEnergy, mainPowerOn }) => {
  const [power, setPower] = useState(false)

  useEffect(() => {
    if (!mainPowerOn) setPower(false)
  }, [mainPowerOn])

  const handleClick = (op: 'on' | 'off' | 'UP' | 'DOWN' | 'ENTR') => {
    switch (op) {
      case 'on':
        if (!power && energy > 15) {
          addEnergy(-15)
          return setPower(true)
        } else break
      case 'off':
        if (power) {
          addEnergy(15)
          return setPower(false)
        } else break
      case 'UP':
        break
      case 'DOWN':
        break
      default:
        break
    }
  }

  let powerStatus: PowerStatus = 'off'
  if (energy > 15) powerStatus = 'dim'
  if (power) powerStatus = 'on'

  return (
    <div className={styles.wrap}>
      <div className={styles.screen}>Selector 15</div>
      <div className={styles.bottom}>
        <div className={styles.buttonsTop}>
          <div className={styles.buttonsTopLeft}>
            <PressableButton
              handleClick={() => handleClick('on')}
              text='1'
              power={powerStatus}
            />
            <PressableButton handleClick={() => handleClick('off')} text='0' />
          </div>
          <div className={styles.buttonsTopRight}>
            <PressableButton handleClick={() => handleClick('UP')} text='UP' />
            <PressableButton
              handleClick={() => handleClick('DOWN')}
              text='DOWN'
            />
          </div>
        </div>
        <div className={styles.buttonsBottom}>
          <PressableButton
            handleClick={() => handleClick('ENTR')}
            text='ENTR'
          />
        </div>
      </div>
    </div>
  )
}
export default HWSelector
