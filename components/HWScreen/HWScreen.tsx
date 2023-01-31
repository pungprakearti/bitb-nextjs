import { useState, useEffect } from 'react'
import { PowerStatus } from 'types'
import cx from 'classnames'
import PressableButton from '@/components/PressableButton'
import styles from './HWScreen.module.scss'
import ArrayToScreen from '../ArrayToScreen'

type Props = {
  energy: number
  addEnergy: Function
  curText: number
  screenText: string[]
}

const HWScreen: React.FC<Props> = ({
  energy,
  addEnergy,
  curText,
  screenText,
}) => {
  const [power, setPower] = useState(false)

  useEffect(() => {
    // If no energy, that means main power is off, so turn off screen
    if (energy === 0) setPower(false)
  }, [energy])

  const handleClick = (op: 'ch+' | 'ch-' | 'power') => {
    switch (op) {
      case 'power': {
        if (!power && energy > 54) {
          setPower(!power)
          return addEnergy(-54)
        }

        if (power) {
          setPower(!power)
          return addEnergy(54)
        }
      }
      case 'ch+': {
        break
      }
      default: {
        return
      }
    }
  }

  // This is the text that is displayed when the selector is on
  // const screenText: JSX.Element[] = [
  //   <div>
  //     You did it! You got this rig running. What other things can you discover?
  //   </div>,
  //   <div>1</div>,
  //   <div>2</div>,
  // ]

  let powerStatus: PowerStatus = 'off'
  if (energy > 54) powerStatus = 'dim'
  if (power) powerStatus = 'on'

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.screenWrap}>
          <div className={styles.screenInner}>
            <div className={cx(styles.screen, { [styles.on]: power })}>
              {/* {power &&
                // <img
                //   className={styles.image}
                //   src='https://cliply.co/wp-content/uploads/2021/07/402107790_STATIC_NOISE_400.gif'
                //   alt='TV static'
                // />
                screenText[curText]} */}
              {power && <ArrayToScreen arr={screenText} />}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.channels}>
            <PressableButton
              text='CH +'
              type='scr'
              handleClick={() => handleClick('ch+')}
            />
            <PressableButton
              text='CH -'
              type='scr'
              handleClick={() => handleClick('ch-')}
            />
          </div>
          <div className={styles.power}>
            <PressableButton
              text='POWER'
              type='scr-power'
              handleClick={() => handleClick('power')}
              power={powerStatus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default HWScreen
