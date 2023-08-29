import React from 'react'
import logo from '../../assets/images/Logo.png'
import prof from '../../assets/images/c60bd48f322b4d711b3e7227674e4f35-fotor-20230812214253.png'
import bell from '../../assets/icons/notification.png'

const Navbar = () => {
    const homepage = false
    const loggedin = false
  return (
    // container
    <div className='flex justify-between p-10 w-full'>
        <div className='p-1 cursor-pointer' onClick='/'>
            <img className='w-32' src={logo} alt='cinema_logo'/>
        </div>
        {homepage ?(
        <div className={`grid grid-rows-1 ${loggedin ?  'grid-cols-3' : 'grid-cols-4' } gap-16`}>
            <div className='p-2 text-base font-regular'>THEATRE</div>
            <div className='p-2 text-base font-regular'>CINEMA</div>
            {loggedin ?(
                <div className='flex justify-items-end -mt-2'>
                <div className='w-10 h-10'>
                    <img src={bell} alt="notification_bell" className='pt-4 z-0'/>
                    <div className='rounded-full bg-cinema-400 w-8 h-8 text-tx_tertiary font-small flex items-center justify-center -mt-5 ml-5 z-10'>2</div>
                </div>
                <img className='w-20 rounded-full ml-10' src={prof} alt='username'/>
                </div>
            ):(
                <>
            <div className='p-2 text-base font-regular'>LOGIN</div>
            <div className='p-2 text-base font-regular'>SIGNUP</div>
            </>
            )}
        </div>):''}
    </div>
  )
}

export default Navbar