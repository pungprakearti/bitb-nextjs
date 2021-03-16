import styles from './index.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.home_Title}>Aleph Nought NextJS Boilerplate</h1>
      <img className={styles.home_Image} src='/ceo.jpeg' />
      <audio src='/sound.wav' autoPlay />
    </div>
  )
}
