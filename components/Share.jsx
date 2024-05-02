import "./Share.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Share() {
    return (
        <>
        <div className="subshare">
            <div className="textsubshare">
            ... invite you to join ... workspace!
            </div>
            <div className="ans-share">
            <div className="bt-share-ansno">Reject</div>
            <div className="bt-share-ansyes">Accept</div>
            </div>
        </div>
        </>
    );
}
export default Share;
