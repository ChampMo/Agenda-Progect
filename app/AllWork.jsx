import "./AllWork.css";
import vectorlogin from "../public/images/vector-login.png";
import { Navbar } from "../components/Navbar";
import Share from "../components/Share";
import Work from "../components/Work";
import alltaskprop from "../public/images/alltask-prop.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function AllWork() {
    const [loadingInfo, setLoadingInfo] = useState(false);
    useEffect(() => {
        const Checklogin = async () => {
            try {
            await axios.get("http://localhost:8000/api/checklogin")
                .then((response) => {
                if (response.data.success) {
                    return;
                } else {
                    navigate("/login");
                }
                })
                .catch((error) => {
                console.error(error);
                });
            } catch (error) {
            console.error(error);
            }
        };
        Checklogin();
    }, []);
    
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [share_request, setShareRequest] = useState([{}]);
    const handleCreateWorkspace = async () => {
        try {
        await axios.get("http://localhost:8000/api/create/workspace/",{ withCredentials: true })
            .then((response) => {
            navigate("/workspace", { state: response.data.workspace_id});
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        setLoadingInfo(false);
        const fetchAllWork = async () => {
            axios.get("http://localhost:8000/api/profileInfo",{ withCredentials: true })
                .then((response) => {
                setUserInfo(response.data.userInfo);
                })
                .catch((error) => {
                console.error(error);
                });
            axios.get("http://localhost:8000/api/share_request",{ withCredentials: true })
                .then((response) => {
                
                setShareRequest(response.data.result);
                })
                .catch((error) => {
                console.error(error);
                });
        }
        fetchAllWork();
    }, [loadingInfo]);
console.log(share_request);

    return (
        <>
        <div className="container-allwork">
            <div className="bgvectorlogin">
                <img className="vectorlogin" src={vectorlogin} alt="" />
            </div>
            <Navbar />
            
            <>
            
            <div className="allcontent">
                <div className="content">
                    <div className="welcome">
                        <h2>Welcome To Agenda</h2>
                    </div>
                    <div className="share">
                        <Share share_request={share_request} setLoadingInfo={setLoadingInfo}/>
                    </div>
                    <div className="work">
                        <div className="mail">
                            <h4>Workspaces for {userInfo.username ? userInfo.username : 'you'}.</h4>
                        </div>
                        <div className="container-work">
                            <Work loadingInfo={loadingInfo} setLoadingInfo={setLoadingInfo}/>
                        </div>
                    </div>

                    <div className="or">OR</div>
                    <div className="create">
                        <div className="grop-fm">
                            <div className="first">
                                <img src={alltaskprop} alt="" />
                            </div>
                            <div className="mid">Create a new Workspace</div>
                        </div>
                        <div className="last">
                            <button
                            onClick={handleCreateWorkspace}
                            >Create!</button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer"></footer>
            </>
        </div>
        </>
    );
}
export default AllWork;
