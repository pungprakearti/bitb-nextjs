// Parse text and convert into JSX
const parseText = (text: string) => {
  let tempWords: string[] = []

  // If LINK create a link on the screen
  if (text.includes('LINK')) {
    const tempSplit = text.split('LINK')

    // Front
    tempWords.push(tempSplit[0])

    // Mid
    const mid = tempSplit[1].split('****')
    const url = mid[0]
    const linkText = mid[1]
    tempWords.push(
      `<a class="screen-text-link" href='${url}' target='_blank' rel='noreferrer'>${linkText}</a>`
    )

    // End
    tempWords.push(tempSplit[2])
  } else {
    tempWords.push(text)
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
