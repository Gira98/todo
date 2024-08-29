import ReactDOM from 'react-dom/client'

import Todo from './components/todo/todo'

function App() {
  return (
    <div>
      <Todo />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
