import { Button, TextField } from '@mui/material'
import React from 'react'

const ResetPass = () => {
  return (
    <div className='flex items-center justify-center h-screen '>
       <div className='w-1/2 h-1/2 bg-white rounded-md shadow-lg p-8 flex flex-col justify-center'>
        <h2 className='text-3xl font-semibold text-center'>პაროლის აღდგენა</h2>
        <div className='flex flex-col gap-4 items-center pt-8'>
       
        <TextField
         hiddenLabel
         id="filled-hidden-label-small"
         placeholder='თქვენი ელ-ფოსტა'
         variant="filled"
         size="small"
         className='w-72 '
/>
<Button variant='contained' color = "success" className='w-72'>გაგზავნა</Button>
</div>
          </div>
    </div>
  )
}

export default ResetPass
