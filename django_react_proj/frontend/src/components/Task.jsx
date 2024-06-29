import React from "react";
import '../styles/Form.css';

function Task({ task, onDelete }) {
    return (
        <div className="container">
            <h3>{task.title}</h3>
            <p className='descrip'>{task.description}</p>
            <p className='info'>
                <i><b>Priority:</b></i> {task.priority === 1 ? 'High Priority' : task.priority === 2 ? 'Moderate Priority' : 'Low Priority'} 
                <i><b> State:</b></i> {task.status} 
                <i><b> Due:</b></i> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
            </p>
            <br/>
            <button className="button del" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
}

export default Task;
