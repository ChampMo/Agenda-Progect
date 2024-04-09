import React from 'react'
import './Navinwork.css'
import loGoW from '../public/images/logo-white.png';
import { Link } from 'react-router-dom';

function Navinwork() {
  return (
    <>
    <div className='navinwork'>
        <Link to="/"><img className='logoinwork' src={loGoW} alt='' /></Link>
        <div className='profile-user'></div>
    </div>
    </>
  )
}
export default Navinwork