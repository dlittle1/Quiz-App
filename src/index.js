import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Container from '@mui/material/Container'
import './app.css'
import { Card, Box } from '@mui/material'
import { GameContextProvider } from './context/gameContext'
ReactDOM.render(
  <GameContextProvider>
    <Container maxWidth='sm'>
      <Box textAlign={'center'} mt={5} padding={1}>
        <Card>
          <App />
        </Card>
      </Box>
    </Container>
  </GameContextProvider>,
  document.getElementById('root')
)
