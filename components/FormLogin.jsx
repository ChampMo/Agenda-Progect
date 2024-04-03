import React from 'react'

function FormLogin(props) {

  const {change} = props;

  return (
    <>
      <label htmlFor='email' className='text-email'>Email</label>
      <input type='email' id='email' name='email' className='input-email'/>
      <label htmlFor='password'className='text-passlogin'>Password</label>
      <input type='password' id='password' name='password' className='input-passlogin'/>
      <div className='bg-button-login'>
          <div className='button-goto-signin'>No account? <a onClick={change}>Sign In!</a></div>
          <div className='button-login'>Login</div>
      </div>
    </>
  )
}

export default FormLogin