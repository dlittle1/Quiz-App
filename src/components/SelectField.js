import { FormControl, Box, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState, useContext } from 'react'
import { GameContext } from '../context/gameContext'

function SelectField(props) {
  const { name, label, options } = props

  const context = useContext(GameContext)

  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValue(value)

    context.handleChange(name, value)
  }

  return (
    <Box mt={3} width='100%'>
      <FormControl sx={{ width: '75%' }} size='small'>
        <InputLabel>{label}</InputLabel>
        <Select label={label} name={name} value={value} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectField
