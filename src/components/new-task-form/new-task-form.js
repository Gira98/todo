import { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {label: ''};
}

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { label } = this.state
    const { onItemAdded } = this.props
    e.preventDefault()
    if (!( label === '')) {
      onItemAdded(label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    const { label } = this.state
    return (
      <form className="todoapp" onSubmit={this.onSubmit}>
        <header className="header">
          <h1>Todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
        </header>
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}