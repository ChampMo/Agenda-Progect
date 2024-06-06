import "./Share.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Share({share_request}) {
    return (
        <>
        {share_request.map((share, item) => {
            return (
            <div
            key={item}
            className="subshare">
                <div className="textsubshare">
                    <div className='info-share-card2'>{share.req_email}</div>
                    <div className='info-share-card2'>[ {share.req_user_name} ]</div>
                    
                    invite you to join
                    <div className='info-share-card2'>{share.workspace_name}</div> 
                    workspace!
                </div>
                <div className="ans-share">
                <div className="bt-share-ansno">Reject</div>
                <div className="bt-share-ansyes">Accept</div>
                </div>
            </div>
            );
        })}
        </>
    );
}
export default Share;
