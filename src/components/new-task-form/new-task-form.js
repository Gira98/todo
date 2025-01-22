import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = { label: '', min: '', sec: '' }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  static validation = (n) => {
    if (n >= 0) {
      return true
    } 
    return false
  }

  onSubmit = (e) => {
    const { label, min, sec } = this.state
    const { onItemAdded } = this.props
    e.preventDefault()

    if (!(label === '') && NewTaskForm.validation(min) && NewTaskForm.validation(sec)) {
      onItemAdded(label, min, sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" type="submit" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
          <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinChange} value={min} />
          <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecChange} value={sec} />

          <button type="submit" style={{ display: 'none' }}>
            Submit
          </button>
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
