import { useState, useEffect, useRef } from 'react'
import { PowerStatus } from 'types'
import cx from 'classnames'
import PressableButton from '@/components/PressableButton'
import Nav from '@/components/Nav'
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
  textOpAndData: TextOpAndData
}

const HWScreen: React.FC<Props> = ({ energy, addEnergy, textOpAndData }) => {
  const { incText, setIncText, proText, setProText } = textOpAndData

  const [power, setPower] = useState(false)
  const [count, setCount] = useState(0)
  const [curChannel, setCurChannel] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const intervalRef = useRef(0)
  const screenRef = useRef<HTMLDivElement>(null)

  const duration = 100

  useEffect(() => {
    // If no energy, that means main power is off,
    // so turn off screen and reset everything
    if (energy === 0) {
      setPower(false)
      setCount(0)
      setCurChannel(0)
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

  // Create channels for screen
  const staticImage = (
    <img
      className={styles.image}
      src='https://cliply.co/wp-content/uploads/2021/07/402107790_STATIC_NOISE_400.gif'
      alt='TV static'
    />
  )

  const channels = [
    <div className={styles.text} ref={screenRef}>
      {proText}
    </div>,
    staticImage,
    <img
      className={styles.image}
      src='https://media.tenor.com/Hat9mQ-QupEAAAAC/dwight-schrute-office.gif'
      alt='The office TV show with Dwight wearing numerous wigs'
      loading='eager'
    />,
    <img
      className={styles.image}
      src='https://i.imgur.com/58rYslM.gif'
      alt='Video game with a tank shooting aliens'
      loading='eager'
    />,
    staticImage,
    <img
      className={styles.image}
      src='/championship_2022.jpg'
      alt='Santa Rosa Misfits hockey team on the ice with the Snoopys trophy'
    />,
  ]

  // Wrap each channel with position absolute styling to have them all load while
  // user is figuring out puzzles
  const channelsEl = channels.map((ch, i) => (
    <div
      className={cx(styles.channelWrap, { [styles.show]: curChannel === i })}
      key={i}
    >
      {ch}
    </div>
  ))

  // Button controls
  const handleClick = (op: 'ch+' | 'ch-' | 'power') => {
    switch (op) {
      case 'power': {
        if (!power && energy > 54) {
          setPower(!power)
          addEnergy(-54)
          break
        }

        if (power) {
          setPower(!power)
          addEnergy(54)
          break
        }
      }
      case 'ch+': {
        if (power) {
          setFadeOut(false)

          if (curChannel + 1 > channelsEl.length - 1) setCurChannel(0)
          else setCurChannel((prev) => prev + 1)
        }
        break
      }
      default: {
        if (power) {
          setFadeOut(false)

          if (curChannel - 1 < 0) setCurChannel(channelsEl.length - 1)
          else setCurChannel((prev) => prev - 1)
        }
      }
    }
    setTimeout(() => {
      setFadeOut(true)
    }, 1000)
  }

  let powerStatus: PowerStatus = 'off'
  if (energy > 54) powerStatus = 'dim'
  if (power) powerStatus = 'on'

  return (
    <div className={styles.wrap}>
      <Nav />
      <div className={styles.inner}>
        <div className={styles.screenWrap}>
          <div className={styles.screenInner}>
            <div className={cx(styles.screen, { [styles.on]: power })}>
              {power && channelsEl}
            </div>
            <div className={cx(styles.channel, { [styles.fadeOut]: fadeOut })}>
              {power && curChannel + 1}
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
