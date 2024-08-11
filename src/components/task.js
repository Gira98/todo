import React from 'react'

import './task.css'

function Task({ description }) {
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">created 5 minutes ago</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" />
      </div>
    </li>
  )
}

export default Task
