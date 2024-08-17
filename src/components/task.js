import React, { Component } from 'react'

import './task.css'

export default class Task extends Component {
  state = {
    isEditing: false,
    inputText: this.props.label
  }

  onEditHandle = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }
  onInputChange = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }
  onEnterPress = (e) => {
    const { onEdit } = this.props

    if (e.key === 'Enter' && e.target.value !== '' && e.target.value !== ' ') {
      onEdit(this.props.id, e.target.value)

      this.setState({
        isEditing: false,
      })
    }
  }
  render() {
    const { label, id, done, onToggleDone, onDelete} = this.props
    const { isEditing, inputText } = this.state
    const editForm = (
      <input
        type="text"
        className="edit"
        onChange={this.onInputChange}
        onKeyDown={this.onEnterPress}
        value={inputText}
      />
    )

    return (
      <li className={done ? 'completed' : isEditing ? "editing" : "" }>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} 
            onChange={() => onToggleDone(id)}  />
          <label>
            <span className="description" onClick={() => onToggleDone(id)}>
              {label}
            </span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.onEditHandle(id)}/>
          <button className="icon icon-destroy" onClick={() => onDelete(id)}/>
        </div>
        {isEditing === true ? editForm : null}
      </li>
    )
  }
}