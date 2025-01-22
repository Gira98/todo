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
    const { label, min = 0, sec = 0, id } = this.props

    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.inputEl = createRef()

    this.totalSeconds = +min * 60 + +sec
    const timeLeft = Task.secondsToTime(this.totalSeconds)

    this.savedCount = sessionStorage.getItem(`timer-${id}`)

    this.state = {
      isEditing: false,
      inputText: label,
      time: timeLeft,
      totalSec: this.savedCount ? parseInt(this.savedCount, 10) : this.totalSeconds,
    }
  }

  startTimer() {
    const { totalSec } = this.state
    const { id } = this.props

    this.pauseTimer()

    if (totalSec > 0) {
      const timer = setInterval(this.countDown, 1000)

      sessionStorage.setItem(`timerId_${id}`, timer.toString())
    }
    console.log('start timer()')
  }

  pauseTimer() {
    const { id } = this.props
    const timerId = sessionStorage.getItem(`timerId_${id}`)

    if (timerId) {
      clearInterval(parseInt(timerId, 10))
      sessionStorage.removeItem(`timerId_${id}`)
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

  countDown() {
    const { id } = this.props
    const { totalSec } = this.state
    const savedTime = sessionStorage.getItem(`timer-${id}`)
    const currentSeconds = savedTime ? parseInt(savedTime, 10) : totalSec
    const seconds = currentSeconds - 1

    if (seconds >= 0) {
      sessionStorage.setItem(`timer-${id}`, seconds)

      if (this.mounted) {
        this.setState({
          time: Task.secondsToTime(seconds),
          totalSec: seconds,
        })
      }
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
    this.mounted = true
    const { id } = this.props
    const savedTime = sessionStorage.getItem(`timer-${id}`)
    const savedTimerId = sessionStorage.getItem(`timerId_${id}`)

    if (savedTime) {
      const seconds = parseInt(savedTime, 10)
      this.setState({
        totalSec: seconds,
        time: Task.secondsToTime(seconds),
      })

      if (savedTimerId) {
        this.startTimer()
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false
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
    const { label, id, done, created, onToggleDone, onDelete } = this.props

    const {
      isEditing,
      inputText,
      time: { m, s },
    } = this.state
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
              {`${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`}
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
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sec: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
Task.defaultProps = {
  min: 0,
  sec: 0,
  created: 0,
}
