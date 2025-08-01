import { useState } from "react"
import { languages } from "./languages"
import { getFarewellText, pickRandomWord } from "./utils"
import clsx from 'clsx';
import Confetti from 'react-confetti';

export default function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => pickRandomWord());
  const [selectedLetters, setSelectedLetters] = useState([])

  const startNewGame = () => {
    setSelectedLetters([]);
    setCurrentWord(pickRandomWord());
  };

  // Derived values
  const wrongGuessCount = selectedLetters.reduce((res, letter) => {
    return !currentWord.includes(letter) ? res + 1 : res
  }, 0)
  const isGameWon =
    currentWord.split("").every(letter => selectedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length
  const isGameOver = isGameWon || isGameLost
  const isLastGuessIncorrect = wrongGuessCount > 0 && !currentWord.includes(selectedLetters[selectedLetters.length - 1])

  // Static values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

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

  const generateGameStatus = () => {
    if (isGameOver) {
      return (
        isGameWon ? (
          <>
            <h3>You win!</h3>
            <p>Well done! 🎉</p>
            <Confetti 
              recycle={false}
              numberOfPieces={1000}
            />
          </>
        ) : (
          <>
            <h3>Game over!</h3>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )
      )
    } else {
      if (isLastGuessIncorrect) {
        const lastLostLanguage = languages[wrongGuessCount - 1].name
        return (
          <>
            <p>{getFarewellText(lastLostLanguage)}</p>
          </>
        )
      }
      return null
    }
  }

  const lettersElement = [...currentWord].map((letter, index) => {
    const className = clsx(
      isGameLost && !selectedLetters.includes(letter) && "missed-letter"
    )
    const shouldRevealLetter = isGameLost || selectedLetters.includes(letter);
    return (
      <div key={index} className={className}>
        {shouldRevealLetter ? letter.toUpperCase() : undefined}
      </div>
    )
  });

  const keyboardElements = alphabet.split('').map(letter => {
    const isSelected = selectedLetters.includes(letter)
    const isCorrect = isSelected && currentWord.includes(letter)
    const isWrong = isSelected && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      'keyboard-letter': true,
    })

    return (
      <button
        key={letter}
        className={className}
        onClick={() => handleClick(letter)}
        disabled={isGameOver}
        aria-disabled={selectedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
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

  const gameStatusClass = clsx({
    "game-status": true,
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  })

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


      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}
      >
        {generateGameStatus()}
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
        {isGameOver &&
          <button
            className='new-game-button'
            onClick={startNewGame}
          >
            New Game
          </button>
        }
      </section>

    </main>
  )
}