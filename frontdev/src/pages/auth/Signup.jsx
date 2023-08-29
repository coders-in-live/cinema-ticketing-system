import React from "react";
import { Button, TextInput } from "../../elements";

const Signup = () => {
  return (
    <div>
    <div className="bg-bg_additional w-[650px] h-[550px] p-12 px-16 rounded-tl-[150px] rounded-br-[150px]">
      <div>
        <label className="mr-16">Name</label>
        <TextInput className="rounded-none w-80 relative left-11" />
      </div>
      <div className="mt-8">
        <label className="mr-16">Email</label>
        <TextInput className="rounded-none w-80 relative left-11" />
      </div>
      <div className="mt-8">
        <label className="mr-16 ">Phone No</label>
        <TextInput className="rounded-none w-80 relative left-4" />
      </div>
      <div className="mt-8">
        <label className="mr-16">Password</label>
        <TextInput className="rounded-none w-80 relative left-4" />
      </div>
      <div className="mt-8">
        <label className="mr-16">Confrim <br />Passsword</label>
        <TextInput className="rounded-none w-80 relative left-3" />
      </div>
    </div>
    <div className="flex justify-around py-10">
    <Button className='w-48 text-white'>Sign up</Button>
    <Button variant='tertiary' className='w-48'>Cancel</Button>
  </div>
  </div>
  );
};

export default Signup;
