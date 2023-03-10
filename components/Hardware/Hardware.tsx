import { useEffect, useState, useRef } from 'react'
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
    [
      'You did it!',
      'You got this LINKhttps://github.com/pungprakearti/bitb-nextjs****rigLINK running.',
      'What else can you discover?',
    ],
    [
      'This was built by LINKhttps://www.linkedin.com/in/andrewpungprakearti****Andrew Pungprakearti.LINK',
      'In his free time, Andrew volunteers',
      'with LINKhttps://www.wearementorme.org****Mentor Me of PetalumaLINK helping less',
      'fortunate youths and coaches youth',
      'hockey for the LINKhttps://santarosaflyers.org/****Santa Rosa Flyers.LINK',
      'Andrew is also a veteran of the',
      'United States Marine Corps having',
      'served during Operation Enduring',
      'Freedom.',
    ],
    [
      'Frontend: Javascript/Typescript,',
      'React/NextJS/Gatsby, GraphQL, CSS/Sass.',
      'Backend: Python, Flask, Node, Express,',
      'Postgres, SQL.',
      'Integrations: Auth0, Google Analytics,',
      'Google ReCaptcha, Pardot, Intercom,',
      'Zoominfo.',
      'Testing: Jest, Nightwatch, Cypress',
    ],
    [
      'Email: LINKmailto:andrew.pungprakearti@gmail.com****andrew.pungprakearti@gmail.comLINK',
      'LinkedIn: LINKhttps://www.linkedin.com/in/andrewpungprakearti****andrewpungprakeartiLINK',
      'Github: LINKhttps://github.com/pungprakearti****pungprakeartiLINK',
    ],
    [
      'LINK/AndrewPungprakearti_Resume2022.pdf****Click hereLINK to download my resume',
    ],
    [
      'LINKhttps://pixabay.com/music/beats-relaxed-vlog-night-street-131746/****Relaxed Vlog(Night Street)LINK',
      'by Danielyan Ashot Makichevich',
    ],
  ]

  useEffect(() => {
    setIncText(screenText[0])
  }, [])

  // Toggle on and off main power. This resets everything
  const handleMainPower = (turnOn: boolean) => {
    if (turnOn) {
      setEnergy(1)
      setIncText(screenText[0])
      return setMainPowerOn(true)
    }

    setEnergy(0)
    setProText([<></>])
    setCurText(0)
    return setMainPowerOn(false)
  }

  const handleEnter = () => {
    setIncText(screenText[curText])
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
            handleEnter={handleEnter}
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
