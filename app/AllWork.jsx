import "./AllWork.css";
import vectorlogin from "../public/images/vector-login.png";
import { Navbar } from "../components/Navbar";
import Share from "../components/Share";
import Work from "../components/Work";
import alltaskprop from "../public/images/alltask-prop.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import footer from "../public/landingprop/footer.png";
import logo from "../public/images/logo.png";
import { Icon } from "@iconify/react";
import { axiosinstant } from "../lib/axiosinstant";



function AllWork() {
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState(null);
    useEffect(() => {
        const Checklogin = async () => {
            try {
            await axiosinstant.get("/api/checklogin")
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
                setDeletingIndex(null);
                })
                .catch((error) => {
                console.error(error);
                });
        }
        fetchAllWork();
    }, [loadingInfo]);
console.log(share_request);
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
                        <Share share_request={share_request} setLoadingInfo={setLoadingInfo} deletingIndex={deletingIndex} setDeletingIndex={setDeletingIndex}/>
                    </div>
                    <div className="work">
                        <div className="mail">
                            <h4>Workspaces for {userInfo.username ? userInfo.username : 'you'}</h4>
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
            <footer className="footer">
                <div className="flex relative justify-center">
                    <img className="footer-bg z-0" src={footer} alt="" />
                    <div className="flex w-5/12 sm:w-full justify-around z-10 absolute bottom-0 sm:h-[300px] scale-75  sm:scale-100">
                    <div className="flex flex-col ml-10 justify-center mb-10">
                        <img 
                        onClick={()=>navigate('/')}
                        className="w-48 sm:w-60 h-20 cursor-pointer object-contain" src={logo} alt="" />
                        <div className="flex text-col1 text-xl pl-3">Manage your task with Agenda.</div>
                        <div className="flex text-col1 text mt-5 pl-3">Connect with Agenda</div>
                        <div className="flex w-full items-center pl-3 gap-5 mt-2">
                            <Icon icon="logos:facebook" width="30" height="30" 
                            className=' cursor-pointer '/>
                            <Icon icon="logos:youtube-icon" width="35" height="35" 
                            className=' cursor-pointer '/>
                        </div> 
                        
                    </div>
                    <div className="flex">
                    </div>
                    <div className="flex">
                        <div className="flex flex-col text-gray-400 mr-20 items-start justify-center gap-3  mb-10">
                        <div className="flex text-xl cursor-pointer hover:text-col1">Learn More</div>
                        <div className="flex text-sm cursor-pointer hover:text-col1">About</div>
                        <div className="flex text-sm cursor-pointer hover:text-col1">FAQ</div>
                        <div className="flex text-sm cursor-pointer hover:text-col1">Teams</div>
                        </div>
                    </div>
                    </div>
                </div>
                <button 
                    onClick={handleScrollTop} 
                    className="group flex items-center justify-center absolute w-14 shadow translate-y-14 h-14 bg-white rounded-full p-0 top-0 cursor-pointer hover:bg-col1 right-40 duration-300">
                    <Icon icon="mingcute:up-line" width="40" height="40" 
                    className='text-black group-hover:text-white'/>
                </button>
                </footer>
            </>
        </div>
        </>
    );
}
export default AllWork;
