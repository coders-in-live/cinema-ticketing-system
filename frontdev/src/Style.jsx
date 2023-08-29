import React from 'react'
import { Button } from './elements/'

const Style = () => {
  return (
    <div>
        <Button variant='secondary'>secondary</Button>
        <Button variant='tertiary'>tertiary</Button>
        <Button variant='primary' size='sm'>Primary</Button>
        <Button variant='primary'>Primary</Button>
        <Button variant='primary' size='lg'>Primary</Button>
        <Button variant='primary' size='wide' >Primary</Button>
        <div className='border-4 border-br_secondary text-heading_1  mt-10 '>Box</div>
    </div>
  )
}

export default Style