import React from 'react'

import Task from './task'
import './task-list.css'

function TaskList({}) {
  return (
    <ul className="todo-list">
      <Task />
    </ul>
  )
}

export default TaskList
