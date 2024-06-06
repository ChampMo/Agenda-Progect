import "./Work.css";
import { Link } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Work() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allWorkspace, setAllWorkspace] = useState([]);
    const [formattedDates, setFormattedDates] = useState([]);

    useEffect(() => {
        const fetchAllWork = async () => {
            try{
            axios.get("http://localhost:8000/api/allwork",{ withCredentials: true })
                .then((response) => {
                
                setAllWorkspace(response.data.allWorkspace);

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
    }, []);
        
    useEffect(() => {
        const dates = allWorkspace.map(workspace => {
            const isoDate = workspace.workspace_create_date;
            const date = new Date(isoDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day} / ${month} / ${year}`;
        });
        setFormattedDates(dates);
    }, [allWorkspace]);

    const handleNameChange = async(index, value, workspaceId) => {

        try{
            await axios.put("http://localhost:8000/api/update/workspace_name", {
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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(workspaces);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setWorkspaces(items);
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
                :(allWorkspace.map((workspace,index) => (
                    <React.Fragment key={index}>
                        <div 
                        className="subwork" >
                            <div className="container-workspaceWork">
                                <div className="workspaceId"># {index+1}</div>
                                <input
                                    type="text"
                                    onChange={(e) => handleNameChange(index, e.target.value, workspace.workspace_id)}
                                    className="workspaceName"
                                    value={workspace.workspace_name}
                                />
                            </div>
                            <div className="date-workspace">{formattedDates[index]}</div>
                            <button
                            onClick={()=>navigate("/workspace", { state: workspace.workspace_id})}
                            >LAUNCH</button>
                        </div>
                        <div className="bt-line-work"></div>
                    </React.Fragment>
                )))
            )}
        </>
    );
}
export default Work;
