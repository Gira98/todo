/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import './task.css'

import { formatDistanceToNowStrict } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { label } = this.props

    this.inputEl = createRef()

    this.timer = null

    this.state = {
      isEditing: false,
      inputText: label,
    }
  }

  startTimer = () => {
    const { totalSec, isTimerRunning, id, updateTask } = this.props

    if (!isTimerRunning && totalSec > 0) {
      updateTask(id, { isTimerRunning: true })

      this.timer = setInterval(this.countDown, 1000)
    }
  }

  pauseTimer = () => {
    const { isTimerRunning, id, updateTask } = this.props

    if (isTimerRunning) {
      clearInterval(this.timer)
      updateTask(id, { isTimerRunning: false })
    }
  }

  static secondsToTime(sec) {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60

    const obj = {
      m: minutes,
      s: seconds,
    }
    return obj
  }

  countDown = () => {
    const { id, updateTask, totalSec } = this.props

    if (totalSec > 0) {
      updateTask(id, {
        totalSec: totalSec - 1,
      })
    } else {
      this.pauseTimer()
    }
  }

  componentDidUpdate() {
    if (this.inputEl.current) {
      this.inputEl.current.focus()
    }
  }

  componentDidMount() {
    const { isTimerRunning } = this.props

    if (isTimerRunning && !this.timer) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onEditHandle = () => {
    const { isEditing } = this.state
    this.setState({
      isEditing: !isEditing,
    })
  }

  onInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    })
  }

  onKeyPress = (e) => {
    const { onEdit, id } = this.props

    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      onEdit(id, e.target.value)
      this.setState({
        isEditing: false,
      })
    }
    if (e.key === 'Enter' && e.target.value.trim() === '') {
      this.setState({
        isEditing: false,
      })
    }

    if (e.key === 'Escape') {
      this.setState({
        isEditing: false,
      })
    }
  }

  onBlur = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { label, id, done, created, onToggleDone, onDelete, totalSec } = this.props
    const time = Task.secondsToTime(totalSec)

    const { isEditing, inputText } = this.state
    const editForm = (
      <input
        type="text"
        className="edit"
        onChange={this.onInputChange}
        onKeyDown={this.onKeyPress}
        onBlur={this.onBlur}
        value={inputText}
        ref={this.inputEl}
      />
    )
    const liClassForm = () => {
      if (isEditing) return 'editing'
      if (done) return 'completed'
      return ''
    }

    const onDeleteHandle = () => {
      onDelete(id)
      this.pauseTimer()
    }

    if (done) {
      this.pauseTimer()
    }

    return (
      <li className={liClassForm()}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
          <label>
            <span className="title" onClick={() => onToggleDone(id)}>
              {label}
            </span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.startTimer} aria-label="Start Timer" />
              <button type="button" className="icon icon-pause" onClick={this.pauseTimer} aria-label="Pause Timer" />
              {`${time.m < 10 ? `0${time.m}` : time.m}:${time.s < 10 ? `0${time.s}` : time.s}`}
            </span>

            <span className="description">
              created {formatDistanceToNowStrict(created, { includeSeconds: true, addSuffix: true })}
            </span>
          </label>

          <button type="button" className="icon icon-edit" onClick={this.onEditHandle} aria-label="Edit task" />
          <button type="button" className="icon icon-destroy" onClick={onDeleteHandle} aria-label="Delete task" />
        </div>
        {isEditing === true ? editForm : null}
      </li>
    )
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalSec: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
}
Task.defaultProps = {
  created: 0,
}
