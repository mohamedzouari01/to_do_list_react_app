import './App.css';
import Todos from './Components/Todos';
import { useState } from 'react';
import { TodosContext } from './Context/todosContext';
function App() {
  const tasks = [];
  const [todotask, setTodotask] = useState(tasks);
  return (
    <div className="App">
      <TodosContext.Provider value={{ todotask, setTodotask }}>
        <Todos />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
