import { useState, useEffect, useRef } from 'react'
import { PowerStatus } from 'types'
import cx from 'classnames'
import PressableButton from '@/components/PressableButton'
import startInterval from '@/util/startInterval'
import parseText from '@/util/parseText'
import styles from './HWScreen.module.scss'

type TextOpAndData = {
  incText: string[]
  setIncText: React.Dispatch<React.SetStateAction<string[]>>
  proText: JSX.Element[]
  setProText: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}

type Props = {
  energy: number
  addEnergy: Function
  curText: number
  textOpAndData: TextOpAndData
}

const HWScreen: React.FC<Props> = ({
  energy,
  addEnergy,
  curText,
  textOpAndData,
}) => {
  const { incText, setIncText, proText, setProText } = textOpAndData

  const [power, setPower] = useState(false)
  const [count, setCount] = useState(0)

  const intervalRef = useRef(0)
  const screenRef = useRef<HTMLDivElement>(null)

  const duration = 100

  useEffect(() => {
    // If no energy, that means main power is off,
    // so turn off screen and reset everything
    if (energy === 0) {
      setPower(false)
      setCount(0)
    }

    // Start reading initial text
    if (power) {
      if (incText.length > count) {
        startInterval(duration, intervalRef, intervalCallback)
      } else {
        clearInterval(intervalRef.current)
        intervalRef.current = 0
        setIncText([])
      }
    }

    // Scroll to bottom as new text comes in
    screenRef?.current?.scrollTo(0, screenRef.current.scrollHeight)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    }
  }, [energy, proText])

  // For new incoming text
  useEffect(() => {
    if (power) {
      if (proText.length) {
        if (intervalRef.current > 0) clearInterval(intervalRef.current)
        setCount(0)
      }

      if (incText.length) {
        startInterval(duration, intervalRef, intervalCallback)
      }
    }
  }, [incText])

  // Increase count and add current text to proText
  const intervalCallback = () => {
    if (incText.length > count) {
      const parsedText = parseText(incText[count])
      setCount((prev) => prev + 1)
      const tempArr = [...proText, parsedText]
      if (tempArr) {
        // Add space between text groups
        if (incText.length === count + 1) setProText([...tempArr, <br></br>])
        else setProText(tempArr)
      }
    }
  }

  // Button controls
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
              <div className={styles.text} ref={screenRef}>
                {power && proText}
              </div>
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
