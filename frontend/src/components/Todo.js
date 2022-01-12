import React from 'react'

export default function Todo(props) {
    const{_id,title,isCompleted}=props.task
    return (
    <div className="Todo">
        <input type="checkbox" checked={isCompleted}/>
    <span>{title}</span>
    <button>x</button>
    </div>
    )
}

