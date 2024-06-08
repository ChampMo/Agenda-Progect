import react, { useState, useEffect } from "react";
import "./Addtask.css";
import Role from "./Role";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Addtask({ setAtciveaddtask , workspace_id, setLoadInfo, task, page2 }) {
    const [classcomponentaddtask, setClasscomponentaddtask] = useState("component-addtask");
    const setAtciveaddtaskfalse = () => {
        setClasscomponentaddtask("component-addtask animation-addtask-reverse");
        setTimeout(() => {
            setAtciveaddtask(false);
        }, 200);
    };

    const [data, setData] = useState({
        taskname: "",
        note: "",
        duedate: "",
        role: [],
        status: "not-start-status",
    });
    
console.log('datadatadata---',data)


    const handleAddtask = async () => {
        if (data.taskname.replace(/\s+/g, "") === "") {
            return;
        }
        await axios.post("http://localhost:8000/api/addtask", {
            data,
            workspace_id
        })
        .then((response)=>{
            console.log(response.data)
            setAtciveaddtaskfalse()
            setLoadInfo(p=>!p)
        })
    }
    const handleSavetask = async () => {

        if (data.taskname.replace(/\s+/g, "") === "") {
            return;
        }
        await axios.put("http://localhost:8000/api/savetask", {
            data,
            task_id:task.task_id,
            workspace_id
        })
        .then((response)=>{
            
            console.log(response.data)
            setAtciveaddtaskfalse()
            setLoadInfo(p=>!p)
        })
    }


    const onChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    };
    const [page, setPage] = useState({
        page: "addtask",
        selectRole:[]
    });

    return (
        <>
        <div className="bgcomponent-addtask"></div>
        <div className={classcomponentaddtask} onClick={setAtciveaddtaskfalse}>
            <div
            className="bg-back-addtask"
            onClick={(innerClickEvent) => {
                innerClickEvent.stopPropagation();
            }}
            >
            <div className="bg-front-addtask"></div>
            <div className="component-add">
                <div className="bgaddt">
                <input
                    className="taskname"
                    placeholder="Task Name"
                    name="taskname"
                    onChange={onChange}
                    value={data.taskname}
                />
                </div>
                <div className="bgaddt-note">
                <textarea
                    placeholder="Note"
                    className="note"
                    name="note"
                    onChange={onChange}
                    value={data.note}
                />
                </div>
                <div className="bgaddt">
                <div className="text-duedate">Due Date :</div>
                <input
                    type="date"
                    className="duedate"
                    name="duedate"
                    onChange={onChange}
                    value={data.duedate!==null?data.duedate.split('T')[0]:''}
                />
                </div>
                <div className="bgaddt">
                <div className="text-role">Role </div>
                <div className="role-box">
                    <Role  
                    workspace_id = {workspace_id}
                    page={page2 === 'EditTask'?'EditTask':page}
                    data={data}
                    task={task}
                    data2={task !== undefined?task.task_id:null}
                    setData={setData}
                    />

                </div>
                </div>
                <div className="bgaddt">
                <div className="text-status">Status </div>
                {data.status === "not-start-status" && (
                    <>
                    <div
                        className="not-start-status"
                        onClick={() =>
                        setData({ ...data, status: "not-start-status" })
                        }
                    >
                        Not Start
                    </div>
                    <div
                        className="in-progress-status"
                        onClick={() =>
                        setData({ ...data, status: "in-progress-status" })
                        }
                        style={{ backgroundColor: "#adadad" }}
                    >
                        In Progress
                    </div>
                    <div
                        className="done-status"
                        onClick={() => setData({ ...data, status: "done-status" })}
                        style={{ backgroundColor: "#adadad" }}
                    >
                        Done
                    </div>
                    </>
                )}
                {data.status === "in-progress-status" && (
                    <>
                    <div
                        className="not-start-status"
                        onClick={() =>
                        setData({ ...data, status: "not-start-status" })
                        }
                        style={{ backgroundColor: "#adadad" }}
                    >
                        Not Start
                    </div>
                    <div
                        className="in-progress-status"
                        onClick={() =>
                        setData({ ...data, status: "in-progress-status" })
                        }
                    >
                        In Progress
                    </div>
                    <div
                        className="done-status"
                        onClick={() => setData({ ...data, status: "done-status" })}
                        style={{ backgroundColor: "#adadad" }}
                    >
                        Done
                    </div>
                    </>
                )}
                {data.status === "done-status" && (
                    <>
                    <div
                        className="not-start-status"
                        onClick={() =>
                        setData({ ...data, status: "not-start-status" })
                        }
                        style={{ backgroundColor: "#adadad" }}
                    >
                        Not Start
                    </div>
                    <div
                        className="in-progress-status"
                        onClick={() =>
                        setData({ ...data, status: "in-progress-status" })
                        }
                        style={{ backgroundColor: "#adadad" }}
                    >
                        In Progress
                    </div>
                    <div
                        className="done-status"
                        onClick={() => setData({ ...data, status: "done-status" })}
                    >
                        Done
                    </div>
                    </>
                )}
                </div>
                <div className="bg-bt-addtask">
                <div
                    type="submit"
                    style={(data.taskname.replace(/\s+/g, "") === "")?{ backgroundColor: "#adadad" }:null}
                    className="bt-addtask"
                    onClick={page2 === 'EditTask'?handleSavetask:handleAddtask}>
                    {page2 === 'EditTask'?"save":"Add Task"}
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default Addtask;
