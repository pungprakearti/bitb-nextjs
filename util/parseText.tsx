// Parse text and convert into JSX
const parseText = (text: string) => {
  let tempWords: string[] = []

  // Check if string contains [link] and if so, create a link for surrounding words
  const words = text.split(' ')
  for (let word of words) {
    if (!word.startsWith('[link=')) {
      tempWords.push(word)
    } else {
      // Remove [link= and [/link]
      let temp = word.slice(6, -7).split(']')

      // Push link
      tempWords.push(
        `<a class="screen-text-link" href='${temp[0]}' target='_blank' rel='noreferrer'>${temp[1]}</a>`
      )
    }
  }

  // Add closing divs
  tempWords.unshift('<div class="screen-text">')
  tempWords.push('</div>')
  const combinedWords = tempWords.join(' ')

  return (
    <div key={Date.now()} dangerouslySetInnerHTML={{ __html: combinedWords }} />
  )
}

export default parseText
