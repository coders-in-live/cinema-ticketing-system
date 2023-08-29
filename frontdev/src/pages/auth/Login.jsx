import React from "react";
import prof from '../../assets/images/c60bd48f322b4d711b3e7227674e4f35-fotor-20230812214253.png'
import { Button, TextInput } from "../../elements";

const Login = () => {
  return (
    <div>
       <div className="flex justify-center"><img className='w-32 -mb-12 rounded-full' src={prof} alt='username'/></div>
    <div className="bg-bg_additional w-[550px] h-[380px] p-12 px-16 rounded-tr-[150px] rounded-bl-[150px]">
      <div className="mt-8">
        <label className="mr-10">Email</label>
        <TextInput className="rounded-none w-72 relative left-10" />
      </div>
      <div className="mt-8">
        <label className="mr-10">Password</label>
        <TextInput className="rounded-none w-72 relative left-3" />
        <p className="text-tx_link flex justify-end pt-4 font-small">Forgot password?</p>
      </div>
    </div>
    <div className="flex justify-around py-10">
    <Button className='w-48 text-white'>Login</Button>
    <Button variant='tertiary' className='w-48'>Cancel</Button>
  </div>
  </div>
  );
};

export default Login;
