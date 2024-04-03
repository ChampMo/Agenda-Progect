import './AllWork.css'
import vectorlogin from '../public/images/vector-login.png';
import {Navbar} from '../components/Navbar'

function AllWork(){
    return(
        <>
            <div className="vectorlogin"><img src={vectorlogin} alt="" /></div>
            
            <Navbar/>
            <div className='allcontent'>
                <div className='content'>
                    <div className='welcome'>
                        <h2>Welcome To Agenda</h2>
                    </div>
                    <div className='work'>
                        <div className='mail'><h4>Workspaces for ...</h4></div>
                        <div className='subwork'>
                            <p>Something Workspace</p>
                            <button>Launch</button>
                        </div>
                        <div className='subwork'>
                            <p>Something Workspace</p>
                            <button>Launch</button>
                        </div>
                        <div className='subwork'>
                            <p>Something Workspace</p>
                            <button>Launch</button>
                        </div>
                    </div>
                    <div className='or'>
                        OR
                    </div>
                    <div className='create'>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default AllWork;