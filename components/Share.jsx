import './Share.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Share(){
    return(
        <>
            <div className='subshare'>
                <div className="textsubshare">
                    ... invite you to join ... workspace!
                </div>
                <div className="ans-share">
                    <div className="bt-share-ansno"><FontAwesomeIcon icon={faXmark} /></div>
                    <div className="bt-share-ansyes"></div>
                </div>
            </div>
        </>
        
    )
}
export default Share