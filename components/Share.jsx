import "./Share.css";
import axios from "axios";

function Share({share_request, setLoadingInfo}) {
    const handleReject = async (share) => {
        try {
            await axios.put("http://localhost:8000/api/request_reject",{ 
                withCredentials: true,
                workspace_id: share.workspace_id,
                req_user_id: share.req_user_id})
                .then((response) => {
                console.log(response.data);
                setLoadingInfo(true);
                })
                .catch((error) => {
                console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleAccept = async (share) => {
        try {
            await axios.put("http://localhost:8000/api/request_accept",{ 
                withCredentials: true,
                workspace_id: share.workspace_id})
                .then((response) => {
                console.log(response.data);
                setLoadingInfo(true);
                })
                .catch((error) => {
                console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
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
                <div 
                onClick={() => handleReject(share)}
                className="bt-share-ansno">Reject</div>
                <div 
                onClick={() => handleAccept(share)}
                className="bt-share-ansyes">Accept</div>
                </div>
            </div>
            );
        })}
        </>
    );
}
export default Share;
