import { useState, useEffect } from 'react'
import { PowerStatus } from 'types'
import cx from 'classnames'
import PressableButton from '@/components/PressableButton'
import styles from './HWScreen.module.scss'

type Props = {
  energy: number
  addEnergy: Function
}

const HWScreen: React.FC<Props> = ({ energy, addEnergy }) => {
  const [power, setPower] = useState(false)

  useEffect(() => {
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

  let powerStatus: PowerStatus = 'off'
  if (energy > 54) powerStatus = 'dim'
  if (power) powerStatus = 'on'

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.screenWrap}>
          <div className={styles.screenInner}>
            <div className={cx(styles.screen, { [styles.on]: power })}>
              {power && (
                <img
                  className={styles.image}
                  src='https://cliply.co/wp-content/uploads/2021/07/402107790_STATIC_NOISE_400.gif'
                  alt='TV static'
                />
              )}
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
