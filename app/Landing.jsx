import './Landing.css'; 
import vectorlanding from '../public/images/vector-landing.png';
import loGo from '../public/images/logo.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='landing'>
      <div className='box-vector-landing'>
        <img className='vector-landing' src={vectorlanding} alt='' />
       
      </div>

      <div className='container'>
        <nav className='nav'>
          <Link to="/" ><img className='logo' src={loGo} alt='' /></Link>
          <Link to="/login" ><div  className='bt-login'>Login</div></Link>
        </nav>
        <header className='header'>
          <h1>Welcome to Agenda </h1>
          <p>Agenda is a platform that allows you to create and manage your events</p>
          <Link to="/allwork" ><div className='button-st'>Start your plan!</div></Link>
        </header>
        
      </div>
      <footer className='footer'>
          
      </footer>
      
    </div>
  );
}

export default Landing;
