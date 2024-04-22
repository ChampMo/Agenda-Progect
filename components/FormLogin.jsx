import React from 'react'

function FormLogin(props) {

  const {change} = props;

  return (
    <>
      <div className='text-inlogin'>Login</div>
      <label htmlFor='email' className='text-email'>Email</label>
      <input type='email' id='email' name='email' className='input-email'/>
      <label htmlFor='password'className='text-passlogin'>Password</label>
      <input type='password' id='password' name='password' className='input-passlogin'/>
      <div className='bg-button-login'>
          <div className='button-goto-signup'>No account? &nbsp;<a onClick={change}>Sign Up!</a></div>
          <div className='button-login'>Login</div>
      </div>
    </>
  )
}

export default FormLogin