import React, { Component } from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (!(this.state.label === '')) {
      this.props.onItemAdded(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form className="todoapp" onSubmit={this.onSubmit}>
        <header className="header">
          <h1>Todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </header>
      </form>
    )
  }
}
