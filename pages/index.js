import PatternLibrary from '@/components/PatternLibrary'
import cx from 'classnames'
import styles from './index.module.scss'

export default function Home() {

  return (
    <div className={cx(styles.wrap, ' container')}>
      <span>
        <h2>
          NextJS Boilerplate by
        </h2>
        <p> <a href='mailto:andrew.pungprakearti@gmail.com'>Andrew Pungprakearti</a></p>
      </span>
      <PatternLibrary />
    </div>
  )
}
