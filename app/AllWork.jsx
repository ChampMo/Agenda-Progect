import './AllWork.css'
import vectorlogin from '../public/images/vector-login.png';
import {Navbar} from '../components/Navbar'
import alltaskprop from '../public/images/alltask-prop.png';

function AllWork(){
    return(
        <>
            <div className="container-allwork">
                <div className="bgvectorlogin">
                    <img className="vectorlogin" src={vectorlogin} alt="" />
                </div>
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
                                <button>LAUNCH</button>
                            </div>
                            <div className='subwork'>
                                <p>Something Workspace</p>
                                <button>LAUNCH</button>
                            </div>
                            <div className='subwork'>
                                <p>Something Workspace</p>
                                <button>LAUNCH</button>
                            </div>
                        </div>
                        <div className='or'>
                            OR
                        </div>
                        <div className='create'>
                            <div className="grop-fm">
                                <div className='first'><img src={alltaskprop} alt="" /></div>
                                <div className='mid'>Create a new Workspace</div>
                            </div>
                            <div className='last'><button>Create!</button></div>
                        </div>
                    </div>
                </div>
                <footer className='footer'>
          
                </footer>
            </div>
        </>
    )
}
export default AllWork;