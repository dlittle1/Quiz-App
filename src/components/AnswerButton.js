import React from 'react'
import { Button } from '@mui/material'
import { decode } from 'html-entities'

function AnswerButton(props) {
  const { answer } = props
  return (
    <Button
      variant='contained'
      type='submit'
      sx={{ margin: '10px', width: '50%' }}
      onClick={() => props.handleClick(answer)}
    >
      {decode(props.answer)}
    </Button>
  )
}

export default AnswerButton
