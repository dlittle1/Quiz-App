import { Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import SelectField from '../components/SelectField'
import useAxios from '../hooks/useAxios'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function WelcomeScreen() {
  // get the categories for the game
  // the api returns {id: ?, name: category_name}
  const { response, loading } = useAxios({ url: 'api_category.php' })
  const navigate = useNavigate()

  if (loading) {
    return (
      <Box sx={{ height: '420px' }}>
        <CircularProgress sx={{ marginTop: '30%' }} />
      </Box>
    )
  }

  const difficultyOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ]

  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choice' },
    { id: 'boolean', name: 'True/False' },
  ]

  const numberOptions = [
    { id: 10, name: '10' },
    { id: 20, name: '20' },
    { id: 30, name: '30' },
    { id: 40, name: '40' },
    { id: 50, name: '50' },
  ]

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/questions', { replace: true })
  }

  return (
    <>
      <Typography variant='h2' mt={2} fontWeight={'bold'} color={'primary'}>
        Trivia-Royale
      </Typography>
      <form onSubmit={handleSubmit}>
        <SelectField
          options={response.trivia_categories}
          label='Category'
          name='category'
        />
        <SelectField
          options={difficultyOptions}
          label='Difficulty'
          name='difficulty'
        />
        <SelectField
          options={typeOptions}
          label='Type of Questions'
          name='type'
        />
        <SelectField
          options={numberOptions}
          label='Number Of Questions'
          name='numberOfQuestions'
        />
        <Button
          variant='contained'
          type='submit'
          sx={{ margin: '20px', width: '50%' }}
        >
          Start
        </Button>
      </form>
    </>
  )
}

export default WelcomeScreen
