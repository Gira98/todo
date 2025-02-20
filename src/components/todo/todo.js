/* eslint-disable no-plusplus */
import { useState, useRef } from 'react'

import { format } from 'date-fns'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'

import './todo.css'

export default function Todo() {
  const maxId = useRef(100)

  function createTodoItem(label, min, sec) {
    const t = +min * 60 + +sec

    return {
      label,
      min,
      sec,
      id: maxId.current++,
      done: false,
      created: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      totalSec: t,
      isTimerRunning: false,
    }
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Eat well', 10, 30),
    createTodoItem('Study', 45, 0),
    createTodoItem('Gym', 30, 0),
  ])
  const [activeFilter, setActiveFilter] = useState('all')

  const updateTask = (id, updates) => {
    setTodoData((prevState) => prevState.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    setTodoData((prevTodoData) => {
      const newArr = [...prevTodoData, newItem]
      return newArr
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((task) => task.id !== id))
  }

  const onEdit = (id, label) => {
    setTodoData((prevTodoData) => {
      const newAr = prevTodoData.map((el) => (el.id === id ? { ...el, label } : el))
      return newAr
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => {
      const newTodoData = prevTodoData.map((item) => {
        if (id === item.id) {
          return { ...item, done: !item.done }
        }

        return item
      })
      return newTodoData
    })
  }

  const onFiltered = (button) => {
    setActiveFilter(button)
  }

  const getFilteredData = (todo) => {
    if (activeFilter === 'all') return todo
    if (activeFilter === 'active') return todo.filter((item) => !item.done)
    if (activeFilter === 'completed') return todo.filter((item) => item.done)
    return todo
  }

  const onClearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.done))
  }

  const todoLeftCount = todoData.length - todoData.filter((el) => el.done).length

  return (
    <section className="todoapp">
      <div className="main">
        <NewTaskForm onItemAdded={addItem} />
        <TaskList
          todos={getFilteredData(todoData)}
          updateTask={updateTask}
          onEdit={onEdit}
          onToggleDone={onToggleDone}
          onDelete={deleteItem}
        />
        <Footer
          todoLeftCount={todoLeftCount}
          onClearCompleted={onClearCompleted}
          activeFilter={activeFilter}
          onFiltered={onFiltered}
        />
      </div>
    </section>
  )
}
