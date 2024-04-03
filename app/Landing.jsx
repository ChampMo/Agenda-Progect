import './Landing.css'; 
import vectorlanding from '../public/images/vector-landing.png';
import loGo from '../public/images/logo.png';

function Landing() {
  return (
    <div className='landing'>
      <div className='box-vector-landing'>
        <img className='vector-landing' src={vectorlanding} alt='' />
       
      </div>

      <div className='container'>
        <nav className='nav'>
          <img className='logo' src={loGo} alt='' />
          <div  className='bt-login'>Login</div>
        </nav>
        <header className='header'>
          <h1>Welcome to Agenda </h1>
          <p>Agenda is a platform that allows you to create and manage your events</p>
          <div className='button-st'>Start your plan!</div>
        </header>
        
      </div>
      <footer className='footer'>
          
      </footer>
      
    </div>
  );
}

export default Landing;
