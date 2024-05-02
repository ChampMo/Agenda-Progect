import react, { useState } from "react";
import "./Addtask.css";
import Role from "./Role";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

function Addtask({ setAtciveaddtask }) {
    const [classcomponentaddtask, setClasscomponentaddtask] =
        useState("component-addtask");
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
        role: [], // ใช้ไม่ได้
        status: "not-start-status",
    });
    const onChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    };
    const [selectRole, setSelectRole] = useState(false);
    const colorBorder = "1px solid #000";
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
                />
                </div>
                <div className="bgaddt-note">
                <textarea
                    placeholder="Note"
                    className="note"
                    name="note"
                    onChange={onChange}
                />
                </div>
                <div className="bgaddt">
                <div className="text-duedate">Due Date :</div>
                <input
                    type="date"
                    className="duedate"
                    name="duedate"
                    onChange={onChange}
                />
                </div>
                <div className="bgaddt">
                <div className="text-role">Role </div>
                <div className="role-box">
                    <Role
                    onClick={() => setSelectRole(!selectRole)}
                    colorBorder={selectRole ? { colorBorder } : null}
                    />

                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
                    <Role />
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
                    className="bt-addtask"
                    onClick={() => console.log(data)}
                >
                    Add Task
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default Addtask;
