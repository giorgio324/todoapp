import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([
    {
      id: Math.random(),
      completed: false,
      todo: 'CLEAR ME',
    },
  ]);

  const addItem = (todo) => {
    if (!input) return;
    // create todo with id
    const newTodo = {
      id: Math.random(),
      completed: false,
      todo,
    };
    // add it to the list but do not overwrite on old values
    setList([...list, newTodo]);
    // clear field
    setInput('');
    console.log(list);
  };
  const completeTask = (id) => {
    const findTodo = list.find((todo) => todo.id === id);
    findTodo.completed = !findTodo.completed;
    console.log(findTodo);
  };
  const removeItem = (id) => {
    const newtodos = list.filter((todo) => todo.id !== id);
    setList(newtodos);
  };
  const clearCompleted = () => {
    const newtodos = list.filter((todo) => todo.completed === false);
    setList(newtodos);
  };
  return (
    <div className=''>
      <main>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addItem(input)}>add</button>
      </main>
      {list.map((todo) => {
        return (
          <div className='item' key={todo.id}>
            <input type='checkbox' onClick={() => completeTask(todo.id)} />
            <p>{todo.todo}</p>
            <button onClick={() => removeItem(todo.id)}>&times;</button>
          </div>
        );
      })}
      <button onClick={clearCompleted}>clear copleted</button>
    </div>
  );
}

export default App;
