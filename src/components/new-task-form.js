import React from 'react'

import './new-task-form.css'

function NewTaskForm({}) {
  return (
    <form className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus />
      </header>
    </form>
  )
}

export default NewTaskForm
