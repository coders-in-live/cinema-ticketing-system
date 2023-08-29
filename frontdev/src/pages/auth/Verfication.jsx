import React from 'react'
import { TextInput, Button } from '../../elements'
import check from "../../assets/icons/checked.png"

const Verify  = () => {
  return (
    <div>
        <div className='flex justify-start'>
        <img src={check} alt="checked" className='w-24 h-24'/>
        <h1 className='text-heading_1 font-medium italic ml-4 mt-3'>Verification Code</h1>
        </div>
        <p className='text-heading_2 pt-12'>Enter the verification Code Send to your Phone or email Address</p>
        <TextInput className="rounded-none w-96 px-4 bg-[#E4E5E5] my-8"/>
        <div className="flex justify-between py-10">
    <Button className='w-48 text-white'>Login</Button>
    <Button variant='tertiary' className='w-48'>Cancel</Button>
  </div>
    </div>
  )
}

export default Verify; 