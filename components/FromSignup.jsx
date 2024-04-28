import React from 'react'

function FromSignup(props) {

  const {change} = props;

  return (
    <>
      <div className='text-insignup'>Sign Up</div>
      <label htmlFor='email' className='text-email'>Email</label>
      <input type='email' id='email' name='email' className='input-emailsignup'/>
      <label htmlFor='password'className='text-passlogin'>Password</label>
      <input type='password' id='password' name='password' className='input-passsignup'/>
      <label htmlFor='password'className='text-passlogin'>Re-Password</label>
      <input type='password' id='repassword' name='password' className='input-repasssignup'/>
      <div className='bg-button-loginsi'>
          <div className='button-goto-signup'>Have account? &nbsp;<a onClick={change}>Login!</a></div>
          <div className='button-login'>Sign Up</div>
      </div>
    </>
  )
}

export default FromSignup