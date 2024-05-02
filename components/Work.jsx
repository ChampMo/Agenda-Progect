import "./Work.css";
import { Link } from "react-router-dom";

function Work() {
    return (
        <>
        <div className="subwork">
            <p>Something Workspace</p>
            <Link to="/workspace">
            <button>LAUNCH</button>
            </Link>
        </div>
        <div className="bt-line-work"></div>
        </>
    );
}
export default Work;
