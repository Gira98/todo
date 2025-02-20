import { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    setSec(e.target.value)
  }

  const validation = (n) => {
    if (n >= 0) {
      return true
    }
    return false
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!(label === '') && validation(min) && validation(sec)) {
      onItemAdded(label, min, sec)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" type="submit" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={onMinChange} value={min} />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecChange} value={sec} />

        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
