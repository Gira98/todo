import React from 'react'

import TasksFilter from './tasks-filter'
import './footer.css'

function Footer({todoLeftCount, onClearCompleted, ...filter}) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoLeftCount} items left</span>
      <TasksFilter { ...filter } />
      <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
    </footer>
  )
}

export default Footer
