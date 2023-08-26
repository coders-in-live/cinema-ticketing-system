import React from 'react'
import { Button } from '../../elements'
import smile from '../../assets/icons/smiling-face.png'

const Sucess = () => {
  return (
    <div>
        <div className='flex justify-center mb-8'>
        <img src={smile} alt='smiley_face' className='w-48 h-48'/>
        </div>
        <h1 className='text-heading_1 font-medium italic ml-4 mt-3'>Congratulations</h1>
        <p className='text-heading_2 pt-12'>You Have Successfully Logged in</p>
        <p className='text-heading_2 pt-12'>Enjoy Our Site</p>
        <Button variant='tertiary' className='w-48 ml-48 mt-24 '>Back to Homepage</Button>
    </div>
  )
}

export default Sucess