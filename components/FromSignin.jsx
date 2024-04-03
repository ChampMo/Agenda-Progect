import React from 'react'

function FromSignin(props) {

  const {change} = props;

  return (
    <>
      <label htmlFor='email' className='text-email'>Email</label>
      <input type='email' id='email' name='email' className='input-emailsignin'/>
      <label htmlFor='password'className='text-passlogin'>Password</label>
      <input type='password' id='password' name='password' className='input-passsignin'/>
      <label htmlFor='password'className='text-passlogin'>Re-Password</label>
      <input type='password' id='password' name='password' className='input-repasssignin'/>
      <div className='bg-button-loginsi'>
          <div className='button-goto-signin'>Have account? <a onClick={change}>Login!</a></div>
          <div className='button-login'>Sign In</div>
      </div>
    </>
  )
}

export default FromSignin