import React from 'react'

import './tasks-filter.css'

function TasksFilter({ activeFilter, onFiltered }) {
  const clickHandler = (activeState) => {
    onFiltered(activeState)
    console.log(activeState)
  }
  return (
    <ul className="filters">
      <li>
        <button className={activeFilter === 'all' ? 'selected' : ''} onClick={() => clickHandler("all")}>
          All
        </button>
      </li>
      <li>
        <button className={activeFilter === 'active' ? 'selected' : ''} onClick={() => clickHandler("active")}>
          Active
        </button>
      </li>
      <li>
        <button className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => clickHandler("completed")}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
