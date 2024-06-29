import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../api";
import Task from "../components/Task";
import '../styles/Form.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState("");
    const [priority, setPriority] = useState("");
    const [duedate, setDuedate] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api
            .post("/api/tasks/", { 
                title, 
                priority: parseInt(priority),  // Ensure priority is an integer
                status: state,  // Ensure the field name matches the model
                description, 
                due_date: duedate  // Ensure the field name matches the model
            })
            .then((res) => {
                if (res.status === 201) {
                    alert("Task created!");
                    // Clear input fields after successful creation
                    setTitle("");
                    setDescription("");
                    setState("");
                    setPriority("");
                    setDuedate("");
                    getTasks();
                } else {
                    alert("Failed to create task.");
                }
            })
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <form onSubmit={createTask}>
                <h1>Welcome to your Tasks</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <h2>Add Task:</h2>
                <input
                    type="text"
                    className="text form-control"
                    name="taskTitle"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    value={priority}
                    className="text form-control mt-2"
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="1">High Priority</option>
                    <option value="2">Moderate Priority</option>
                    <option value="3">Low Priority</option>
                </select>
                <select
                    value={state}
                    className="text form-control mt-2"
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select> <br/>
                <input
                    type="text"
                    className="text form-control mt-2"
                    name="taskDescription"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="text form-control mt-2"
                    type="date"
                    name="taskDueDate"
                    value={duedate}
                    onChange={(e) => setDuedate(e.target.value)}
                />
                <button type="submit" className="button mt-2">Add Task</button>
                <br/>
                <div>
                    <h2>Tasks:</h2>
                    {tasks.map((task) => (
                        <Task task={task} onDelete={deleteTask} key={task.id} />
                    ))}
                </div>
            </form>
        </div>
    );
}

export default Home;
