import React, { useContext, useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { GameContext } from '../context/gameContext'
import { Link } from 'react-router-dom'

function EndGame() {
  const context = useContext(GameContext)
  const [saying, setSaying] = useState('')

  const { numberOfQuestions } = context.gameState

  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue
  }

  useEffect(() => {
    if (percentage(context.score, numberOfQuestions) > 70) {
      setSaying('WOW! NICE!')
    } else if (percentage(context.score, numberOfQuestions) >= 50) {
      setSaying('Good Job!')
    } else {
      setSaying("eh, i've seen better")
    }
  }, [])

  function clearScore() {
    context.setScore(0)
  }

  return (
    <>
      <Typography variant='h2' mt={2} fontWeight={'bold'} color={'primary'}>
        Trivia-Royale
      </Typography>
      <Typography variant='h3' mt={2} fontWeight={'bold'}>
        You Scored: {context.score}
      </Typography>
      <Typography variant='h3' mt={2} fontWeight={'bold'} color={'primary'}>
        {saying}
      </Typography>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button
          variant='contained'
          type='submit'
          sx={{ margin: '10px', width: '50%' }}
          onClick={clearScore}
        >
          Play Again
        </Button>
      </Link>
    </>
  )
}

export default EndGame
