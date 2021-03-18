import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(!loaded) {
      window.setTimeout(() => {
        setLoaded(true)
      }, 500)
    }
  }, [])

  return (
    <div className={styles.home}>
      <h1 className={styles.home_Title}>Aleph Nought NextJS Boilerplate</h1>
      <img className={styles.home_Image} src='/ceo.jpeg' />
      {loaded && (
        <audio src='/sound.wav' autoPlay />
      )}
    </div>
  )
}
