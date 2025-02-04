/* eslint-disable no-plusplus */
import { Component } from 'react'

import { format } from 'date-fns'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'

import './todo.css'

export default class Todo extends Component {
  maxId = 100

  constructor(props) {
    super(props)
    this.state = {
      todoData: [
        this.createTodoItem('Eat well', 10, 30),
        this.createTodoItem('Study', 45, 0),
        this.createTodoItem('Gym', 30, 0),
      ],
      activeFilter: 'all',
    }
  }

  createTodoItem(label, min, sec) {
    const t = +min * 60 + +sec

    return {
      label,
      min,
      sec,
      id: this.maxId++,
      done: false,
      created: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      totalSec: t,
      isTimerRunning: false,
    }
  }

  updateTask = (id, updates) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }))
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => id === el.id)
      return {
        todoData: todoData.toSpliced(idx, 1),
      }
    })
  }

  onEdit = (id, label) => {
    this.setState(({ todoData }) => {
      const newAr = todoData.map((el) => {
        if (el.id === id) return this.createTodoItem(label)
        return el
      })
      return {
        todoData: newAr,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((item) => {
        if (id === item.id) {
          return { ...item, done: !item.done }
        }

        return item
      })
      return { todoData: newTodoData }
    })
  }

  onFiltered = (button) => {
    this.setState({ activeFilter: button })
  }

  getFilteredData = (todoData) => {
    const { activeFilter } = this.state
    if (activeFilter === 'all') return todoData
    if (activeFilter === 'active') return todoData.filter((item) => !item.done)
    if (activeFilter === 'completed') return todoData.filter((item) => item.done)
    return todoData
  }

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const clearedAr = todoData.map((el) => {
        if (el.done) this.deleteItem(el.id)
        return el
      })
      return {
        todoData: clearedAr,
      }
    })
  }

  render() {
    const { todoData, activeFilter } = this.state
    const todoLeftCount = todoData.length - todoData.filter((el) => el.done).length
    return (
      <section className="todoapp">
        <div className="main">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={this.getFilteredData(todoData)}
            updateTask={this.updateTask}
            onEdit={this.onEdit}
            onToggleDone={this.onToggleDone}
            onDelete={this.deleteItem}
          />
          <Footer
            todoLeftCount={todoLeftCount}
            onClearCompleted={this.onClearCompleted}
            activeFilter={activeFilter}
            onFiltered={this.onFiltered}
          />
        </div>
      </section>
    )
  }
}
