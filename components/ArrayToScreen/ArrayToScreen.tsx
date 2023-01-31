import { useEffect, useRef, useState } from 'react'
import styles from './ArrayToScreen.module.scss'

type Props = {
  arr: string[]
}

// Take an array of strings and print each line incrementally
const ArrayToScreen: React.FC<Props> = ({ arr }) => {
  const [lineNum, setLineNum] = useState(0)
  const intervalRef = useRef(0)
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineNum((prev) => prev + 1)
    }, 500)

    intervalRef.current = interval

    if (lineNum > arr.length - 1) clearInterval(intervalRef.current)

    screenRef?.current?.scrollTo(0, screenRef.current.scrollHeight)

    return () => clearInterval(intervalRef.current)
  }, [lineNum])

  // Create text by line
  let textEl: JSX.Element[] = []
  for (let i = 0; i < lineNum; i++) {
    let tempWords: string[] = []
    // Check if string contains [link] and if so, create a link for surrounding words
    const words = arr[i].split(' ')
    for (let word of words) {
      if (!word.startsWith('[link=')) {
        tempWords.push(word)
      } else {
        // Remove [link= and [/link]
        let temp = word.slice(6, -7).split(']')

        // Push link
        tempWords.push(
          `<a href='${temp[0]}' target='_blank' rel='noreferrer'>${temp[1]}</a>`
        )
      }
    }

    // Add closing divs
    tempWords.unshift('<div>')
    tempWords.push('</div>')
    const combinedWords = tempWords.join(' ')

    textEl.push(<div dangerouslySetInnerHTML={{ __html: combinedWords }} />)
  }

  return (
    <div ref={screenRef} className={styles.wrap}>
      {textEl}
    </div>
  )
}
export default ArrayToScreen
