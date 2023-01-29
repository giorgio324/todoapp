import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  };

  // finds which checkbox you clicked with id and flips its completed value it also causes rerender so it updates the values
  const completeTask = (id) => {
    const reRenderTrigger = [...list];
    const findTodo = list.find((todo) => todo.id === id);
    findTodo.completed = !findTodo.completed;
    setList(reRenderTrigger);
  };

  // finds which X you clicked with id and loops through all list values when it finds a match of id it just removes it and changes list with new values
  const removeItem = (id) => {
    const newtodos = list.filter((todo) => todo.id !== id);
    setList(newtodos);
  };

  // loops through list and checks which of them have completed values false if it finds a match it returns those values and keeps them in list
  const clearCompleted = () => {
    const newtodos = list.filter((todo) => todo.completed === false);
    setList(newtodos);
  };

  // tracks checked item amount by filtering it
  const checkedAmount = list.filter((todo) => todo.completed === false).length;

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
                <p className={todo.completed ? 'line' : ''}>{todo.todo}</p>
                <button className='x' onClick={() => removeItem(todo.id)}>
                  <img src={cross} alt='' />
                </button>
              </div>
            );
          })}
          <div className='todo-items-container-footer'>
            <p>{checkedAmount} items left</p>
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
