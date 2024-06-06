import "./Share.css";
import axios from "axios";
import { useState } from "react";

function Share({share_request, setLoadingInfo, deletingIndex, setDeletingIndex}) {
    const handleReject = async (share, index) => {
        try {
            await axios.put("http://localhost:8000/api/request_reject",{ 
                withCredentials: true,
                workspace_id: share.workspace_id,
                req_user_id: share.req_user_id})
                .then((response) => {
                    console.log(response.data);
                    setDeletingIndex(index);
                    setTimeout(() => {
                        setLoadingInfo(true);
                    }, 200);

                })
                .catch((error) => {
                console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleAccept = async (share, index) => {
        
        try {
            await axios.put("http://localhost:8000/api/request_accept",{ 
                withCredentials: true,
                workspace_id: share.workspace_id})
                .then((response) => {
                    console.log(response.data);
                    setDeletingIndex(index);
                    setTimeout(() => {
                        setLoadingInfo(true);
                    }, 200);
                })
                .catch((error) => {
                console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    console.log('share_requestshare_request',share_request.length);
    return (
        <>
        {share_request.length > 0 ?
        (share_request.map((share, index) => {
            return (
            <div
            key={index}
            className={`subshare ${deletingIndex === index ? 'slide-out duration-200' : ''}`}>
                <div className="textsubshare">
                    <div className='info-share-card2'>{share.req_email}</div>
                    <div className='info-share-card2'>[ {share.req_user_name} ]</div>
                    
                    invite you to join
                    <div className='info-share-card2'>{share.workspace_name}</div> 
                    workspace!
                </div>
                <div className="ans-share">
                <div 
                onClick={() => handleReject(share, index)}
                className="bt-share-ansno">Reject</div>
                <div 
                onClick={() => handleAccept(share, index)}
                className="bt-share-ansyes">Accept</div>
                </div>
            </div>
            );
        })):null}
        </>
    );
}
export default Share;
