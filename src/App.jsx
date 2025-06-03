import { useState } from "react"
import { languages } from "./languages.js"

export default function App() {

  const isWon = false

  const gameStatusElement = (
    <>
      <h3>You win!</h3>
      <p>Well done! 🎉</p>
    </>
  )

  const languageChipsElement = languages.map(language => {
      const styles = {
        backgroundColor: language.backgroundColor,
        color: language.color,
        textAlign: "center",
        padding: "4px",
        borderRadius: "3px",
        fontSize: "12px",
        fontWeight: "bold",
      }
      return (
        <div key={language.name} style={styles}>
          {language.name}
        </div>
      )
    }
  )

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

    </main>
  )
}