import { useState } from "react"
import { languages } from "./languages.js"
import clsx from 'clsx'

export default function App() {
  const [currentWord, setCurrentWord] = useState('react')
  const [selectedLetters, setSelectedLetters] = useState([])
  
  const wrongGuessCount = selectedLetters.reduce((res, letter) => {
    return !currentWord.includes(letter) ? res + 1 : res
  }, 0)

  const isWon = false

  const gameStatusElement = (
    <>
      <h3>You win!</h3>
      <p>Well done! 🎉</p>
    </>
  )

  const languageChipsElement = languages.map((language, index) => {
      const styles = {
        backgroundColor: language.backgroundColor,
        color: language.color,
      }
      const className = clsx({
        chip: true,
        lost: index < wrongGuessCount,
      })
      
      return (
        <div 
          className={className}
          key={language.name} 
          style={styles} 
        >
          {language.name}
        </div>
      )
    }
  )

  const lettersElement = [...currentWord].map((letter, index) => (
    <div key={index} className="letter-div">
      {selectedLetters.includes(letter) ? letter.toUpperCase() : undefined}
    </div>
  ))

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const keyboardElements = alphabet.split('').map(letter => { 
    const isSelected = selectedLetters.includes(letter)
    const isCorrect = isSelected && currentWord.includes(letter)
    const isWrong = isSelected && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      'keyboard-letter': true,
    })

    return(
      <button key={letter} 
        className={className} onClick={()=> handleClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function handleClick(letter) {
    if (!selectedLetters.includes(letter)) {
      setSelectedLetters(prev => [...prev, letter])
    }
  }

  return (
    <main>
      <header>
        <h1>
          Assembly: Endgame
        </h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>
      </header>


      <section className="game-status">
        {gameStatusElement}
      </section>

      <section className="language-chips">
        {languageChipsElement}
      </section>

      <section className="guess-letter">
        {lettersElement}
      </section>

      <section className='keyboard'>
        {keyboardElements}
      </section>

      <section className='new-game-section'>
        <button className='new-game-button'>
          New Game
        </button>
      </section>
      
    </main>
  )
}