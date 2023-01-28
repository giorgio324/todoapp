import { useState } from 'react';
import sunImage from './images/icon-sun.svg';
import cross from './images/icon-cross.svg';
import moonImage from './images/icon-moon.svg';
import lightHeader from './images/bg-desktop-light.jpg';
function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([
    {
      id: Math.random(),
      completed: false,
      todo: 'CLEAR ME',
    },
    {
      id: Math.random(),
      completed: false,
      todo: 'CLEAR ME 2',
    },
  ]);

  const addItem = (e, todo) => {
    e.preventDefault();
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
    <div className='app-container'>
      <div className='bg-container'>
        <img src={lightHeader} alt='' className='lbg-img' />
      </div>
      <div className='todo-container'>
        <main>
          <div className='title-container'>
            <h1>TODO</h1>
            <button className='theme-changer-button'>
              <img src={moonImage} alt='' />
            </button>
          </div>
          <form className='form'>
            <input
              className='form-input'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className='submit-btn'
              type='submit'
              onClick={(e) => addItem(e, input)}
            >
              ADD
            </button>
          </form>
        </main>
        <div className='todo-items-container'>
          {list.map((todo) => {
            return (
              <div className='item' key={todo.id}>
                <input type='checkbox' onClick={() => completeTask(todo.id)} />
                <p>{todo.todo}</p>
                <button className='x' onClick={() => removeItem(todo.id)}>
                  <img src={cross} alt='' />
                </button>
              </div>
            );
          })}
          <div className='todo-items-container-footer'>
            <p>{list.length} items left</p>
            <button onClick={clearCompleted} className='clear-completed'>
              clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
