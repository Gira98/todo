import React from 'react'

import TaskList from './task-list'
import Footer from './footer'
import NewTaskForm from './new-task-form'

import './todo.css'

function Todo() {
  return (
    <div className="main">
      <NewTaskForm />
      <TaskList />
      <Footer />
    </div>
  )
}

export default Todo
