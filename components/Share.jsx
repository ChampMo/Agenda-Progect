import './Share.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

function Share(){
    return(
        <>
            <div className='subshare'>
                <div className="textsubshare">
                    ... invite you to join ... workspace!
                </div>
                <div className="ans-share">
                    <div className="bt-share-ansno"></div>
                    <div className="bt-share-ansyes"></div>
                </div>
            </div>
        </>
        
    )
}
export default Share