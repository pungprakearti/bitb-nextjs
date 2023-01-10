import cx from 'classnames'
import Hardware from '@/components/Hardware'
import styles from '@/styles/index.module.scss'

export default function Home() {
  return (
    <div className={cx(styles.wrap, ' container')}>
      <Hardware />
    </div>
  )
}
