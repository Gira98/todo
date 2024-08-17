import React from 'react'

import Task from './task'
import './task-list.css'

function TaskList({todos, onToggleDone, onDelete, onEdit}) {
  const items = todos.map( (todo) => (<Task { ...todo } key={todo.id} onToggleDone={onToggleDone} onDelete={onDelete} onEdit={onEdit} />))
  return (
    <ul className="todo-list">
      { items } 
    </ul>
  )
}

export default TaskList
