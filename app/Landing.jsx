import './Landing.css';  // Add a CSS file for styling
import vector1 from '../public/images/vector1.png';
import loGo from '../public/images/logo.png';

function Landing() {
  return (
    <div className='landing'>
      <div className='box-vector1'>
        <img className='vector1' src={vector1} alt='' />
       
      </div>

      <div className='container'>
        <nav className='nav'>
          <img className='logo' src={loGo} alt='' />
          <div  className='login'>Login</div>
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
