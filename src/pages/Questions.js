import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { GameContext } from '../context/gameContext'
import useAxios from '../hooks/useAxios'
import { decode } from 'html-entities'
import AnswerButton from '../components/AnswerButton'
import { useNavigate } from 'react-router-dom'

// shuffle the correct_question into the array of incorrect_questions
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

// Start of Questions page
function Questions() {
  const context = useContext(GameContext)
  const navigate = useNavigate()

  //retrieve gameState from context, the gameState was set in the WelcomeScreen page.
  const { numberOfQuestions, category, difficulty, type } = context.gameState

  // attach the selected settings to the api call
  let apiUrl = `/api.php?amount=${numberOfQuestions}`
  if (category) {
    apiUrl = apiUrl.concat(`&category=${category}`)
  }
  if (difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${difficulty}`)
  }
  if (type) {
    apiUrl = apiUrl.concat(`&type=${type}`)
  }
  const { response, loading } = useAxios({ url: apiUrl })
  //////

  const [answers, setAnswers] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex]
      // array of all the answers incorrect and correct
      let tempAnswers = question.incorrect_answers
      tempAnswers.push(question.correct_answer)
      // shuffle the array
      tempAnswers = shuffle(tempAnswers)
      setAnswers(tempAnswers)
      setCorrectAnswer(question.correct_answer)
    }
  }, [response, questionIndex])

  if (loading) {
    return (
      <Box sx={{ height: '420px' }}>
        <CircularProgress sx={{ marginTop: '30%' }} />
      </Box>
    )
  }

  console.log(correctAnswer)

  //if there aren't enough questions in the database
  if (response.response_code === 1) {
    return (
      <>
        <Typography variant='h6' m={2}>
          There aren't enough questions in this category with your selected
          settings.
        </Typography>
        <Button
          variant='contained'
          type='submit'
          sx={{ margin: '10px', width: '50%' }}
          onClick={() => navigate('/', { replace: true })}
        >
          Click To Go Back
        </Button>
      </>
    )
  }

  // sets the location of index which will change upon an answer being clicked, if there are no more questions navigate to endpage
  function handleClick(answer) {
    if (questionIndex < response?.results.length - 1) {
      setQuestionIndex(questionIndex + 1)
      if (answer === correctAnswer) {
        context.setScore(context.score + 1)
      }
    } else {
      navigate('/endGame', { replace: true })
    }
  }

  return (
    <Box>
      <Typography variant='h6' mt={2}>
        Question {questionIndex + 1}
      </Typography>
      <Typography m={3} variant='h5'>
        {decode(response.results[questionIndex].question)}
      </Typography>
      <Box mt={1}>
        {answers.map((answer, i) => (
          <AnswerButton
            answer={answer}
            handleClick={handleClick}
            key={i}
          ></AnswerButton>
        ))}
      </Box>
      <Box mt={5} mb={2}>
        <Typography fontWeight={'bold'}>
          Score: {context.score}/{response.results.length}
        </Typography>
      </Box>
    </Box>
  )
}

export default Questions
