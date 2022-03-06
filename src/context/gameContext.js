import React, { useState } from 'react'

const GameContext = React.createContext()

function GameContextProvider(props) {
  const [gameState, setGameState] = useState({
    category: null,
    difficulty: null,
    type: null,
    numberOfQuestions: 10,
  })

  const [score, setScore] = useState(0)

  function handleChange(name, value) {
    setGameState((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <GameContext.Provider value={{ handleChange, gameState, score, setScore }}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameContextProvider }
