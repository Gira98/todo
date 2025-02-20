/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './task.css'

import { formatDistanceToNowStrict } from 'date-fns'

export default function Task({
  label,
  totalSec,
  isTimerRunning,
  id,
  updateTask,
  onEdit,
  done,
  created,
  onToggleDone,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputText, setInputText] = useState(label)

  const inputEl = useRef(null)
  const timer = useRef(0)
  const savedCallback = useRef()

  const pauseTimer = () => {
    if (isTimerRunning) {
      clearInterval(timer.current)
      timer.current = 0
      updateTask(id, { isTimerRunning: false })
    }
  }

  function countDown() {
    if (totalSec > 0) {
      updateTask(id, {
        totalSec: totalSec - 1,
      })
    } else {
      pauseTimer()
    }
  }

  function callback() {
    savedCallback.current()
  }

  const startTimer = () => {
    if (!isTimerRunning && totalSec > 0) {
      updateTask(id, { isTimerRunning: true })

      timer.current = setInterval(callback, 1000)
    }
  }

  function secondsToTime(sec) {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60

    const obj = {
      m: minutes,
      s: seconds,
    }
    return obj
  }

  useEffect(() => {
    if (isTimerRunning && !timer.current) {
      timer.current = setInterval(callback, 1000)
    }

    return () => {
      clearInterval(timer.current)
      timer.current = 0
    }
  }, [])

  useEffect(() => {
    savedCallback.current = countDown

    if (inputEl.current) {
      inputEl.current.focus()
    }
  })

  const onEditHandle = () => {
    setIsEditing(!isEditing)
  }

  const onInputChange = (e) => {
    setInputText(e.target.value)
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      onEdit(id, e.target.value)
      setIsEditing(false)
    }
    if (e.key === 'Enter' && e.target.value.trim() === '') {
      setIsEditing(false)
    }

    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  const onBlur = () => {
    setIsEditing(false)
  }

  const time = secondsToTime(totalSec)

  const editForm = (
    <input
      type="text"
      className="edit"
      onChange={onInputChange}
      onKeyDown={onKeyPress}
      onBlur={onBlur}
      value={inputText}
      ref={inputEl}
    />
  )
  const liClassForm = () => {
    if (isEditing) return 'editing'
    if (done) return 'completed'
    return ''
  }

  const onDeleteHandle = () => {
    onDelete(id)
    pauseTimer()
  }

  if (done) {
    pauseTimer()
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
            <button type="button" className="icon icon-play" onClick={startTimer} aria-label="Start Timer" />
            <button type="button" className="icon icon-pause" onClick={pauseTimer} aria-label="Pause Timer" />
            {`${time.m < 10 ? `0${time.m}` : time.m}:${time.s < 10 ? `0${time.s}` : time.s}`}
          </span>

          <span className="description">
            created {formatDistanceToNowStrict(created, { includeSeconds: true, addSuffix: true })}
          </span>
        </label>

        <button type="button" className="icon icon-edit" onClick={onEditHandle} aria-label="Edit task" />
        <button type="button" className="icon icon-destroy" onClick={onDeleteHandle} aria-label="Delete task" />
      </div>
      {isEditing === true ? editForm : null}
    </li>
  )
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
