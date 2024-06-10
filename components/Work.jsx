import "./Work.css";
import { Link } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { Icon } from '@iconify/react';
import { axiosinstant } from "../lib/axiosinstant";

function Work({loadingInfo, setLoadingInfo}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allWorkspace, setAllWorkspace] = useState([]);
    const [formattedDates, setFormattedDates] = useState([]);

    useEffect(() => {
        setLoadingInfo(false)
        const fetchAllWork = async () => {
            setLoading(false);
            try{
                axiosinstant.get("/api/allwork",{ withCredentials: true })
                .then((response) => {
                
                const allWorkspace = response.data.allWorkspace;
                allWorkspace.sort((a, b) => a.order_number - b.order_number);
                setAllWorkspace(allWorkspace);

                setLoading(false)
                })
                .catch((error) => {
                console.error(error);
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllWork();
    }, [loadingInfo]);


    useEffect(() => {
        const monthsAbbreviated = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
    
        const dates = allWorkspace.map(workspace => {
            const isoDate = workspace.workspace_create_date;
            const date = new Date(isoDate);
            const day = date.getDate();
            const month = monthsAbbreviated[date.getMonth()]; // ใช้เดือนอังกฤษแบบย่อ
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        });
    
        setFormattedDates(dates);
    }, [allWorkspace]);
    

    const handleNameChange = async(index, value, workspaceId) => {

        try{
            await axiosinstant.put("/api/update/workspace_name", {
                withCredentials: true,
                workspace_id: workspaceId,
                workspace_name: value,
            })
            .then((response) => {
                const updatedWorkspaces = [...allWorkspace];
                updatedWorkspaces[index].workspace_name = response.data.workspace_name;
                setAllWorkspace(updatedWorkspaces);
            })
        } catch (error) {
            console.error(error);
        }
    };




    const [draggedIndex, setDraggedIndex] = useState(null);
    const [ hoverSection, setHoverSection ] = useState(null);
    
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.currentTarget.classList.add('dragging');
    };
    
    const handleDragOver = (e, index) => {
        
        e.preventDefault();
        const dragOverWorkspace = document.getElementById(`workspace-${index}`);
        console.log(dragOverWorkspace.id.replace('workspace-', ''));

        if (dragOverWorkspace) {
            setHoverSection(dragOverWorkspace.id.replace('workspace-', ''));
        }
    };
    
    useEffect(() => {
        if (hoverSection !== null) {
            const dragOverWorkspace = document.getElementById(`workspace-${hoverSection}`);
            const subworkhoverSection = document.getElementById(`subwork-${hoverSection}`);
            for (let i = 0; i < allWorkspace.length; i++) {
                const workspace = document.getElementById(`subwork-${i}`);
                if (workspace) {
                    workspace.classList.remove('drag-over');
                }
            }
            subworkhoverSection.classList.add('drag-over');
        }
    }, [hoverSection]);
    

    const handleDrop = async(e, index) => {
        e.preventDefault();
        const updatedWorkspaces = [...allWorkspace];
        const draggedWorkspace = updatedWorkspaces[draggedIndex];
        updatedWorkspaces.splice(draggedIndex, 1);
        updatedWorkspaces.splice(index, 0, draggedWorkspace);
        setAllWorkspace(updatedWorkspaces);
        setDraggedIndex(null);
        setHoverSection(null);

        const workspaceIds = updatedWorkspaces.map(workspace => workspace.workspace_id);
        await axiosinstant.put("/api/update/order_number", {
            withCredentials: true,
            workspaceIds: workspaceIds,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
        const dragOverWorkspace = document.getElementById(`subwork-${index}`);
        if (dragOverWorkspace) {
            dragOverWorkspace.classList.remove('drag-over');
        }

        const draggingWorkspace = document.querySelector('.subwork.dragging');
        if (draggingWorkspace) {
            draggingWorkspace.classList.remove('dragging');
        }
    };
    

    return (
        <>
        {loading
            ?
            <div className="bg-loading">
                <DotLoader
                color="#2960cd"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
            </div>
            :
            (allWorkspace.length === 0 ?
                <div className="no-workspace">Let's start creating your workspace!</div>
                :<div className="container-work">
                {allWorkspace.map((workspace, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="subwork"
                            id={`subwork-${index}`}
                            
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            <div className="bg-container-workspaceWork">
                                <div className="container-workspaceWork">
                                    {/* <div 
                                    className="workspaceId" id={`workspace-${index}`}>
                                    #{index + 1}
                                    </div> */}
                                    <div 
                                    draggable 
                                    id={`workspace-${index}`}
                                    className="icon-drag-drop">
                                        <Icon   icon="mingcute:dots-fill" width="25" height="25" />
                                    </div>
                                    <div className="bg-icon_workspace">
                                        <img className="icon_workspace" src={workspace.workspace_icon}/>
                                    </div>

                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            handleNameChange(index, e.target.value, workspace.workspace_id)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.target.blur();
                                            }
                                        }}
                                        className="workspaceName"
                                        value={workspace.workspace_name}
                                    />
                                </div>
                                <div className="date-workspace">{formattedDates[index]}</div>
                            </div>
                            <button
                                onClick={() => navigate("/workspace", { state: workspace.workspace_id })}>
                                LAUNCH
                            </button>
                        </div>
                        <div className="bt-line-work"></div>
                    </React.Fragment>
                ))}
            </div>
            
            )}
        </>
    );
}
export default Work;
