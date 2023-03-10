import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sunImage from './images/icon-sun.svg';
import cross from './images/icon-cross.svg';
import moonImage from './images/icon-moon.svg';
import lightHeader from './images/bg-desktop-light.jpg';
import darkHeader from './images/bg-desktop-dark.jpg';
import lightHeaderMobile from './images/bg-mobile-light.jpg';
import darkHeaderMobile from './images/bg-mobile-dark.jpg';
function App() {
  const [input, setInput] = useState('');
  // gets items from localstorage if there are none and its new user it gets default values
  const [list, setList] = useState(() => {
    const localData = localStorage.getItem('todos');
    return localData
      ? JSON.parse(localData)
      : [
          {
            id: Math.random(),
            completed: false,
            todo: 'I am going to track the tasks that you have to do',
          },
          {
            id: Math.random(),
            completed: false,
            todo: "So you won't forget it",
          },
        ];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const localData = localStorage.getItem('theme');
    return localData ? JSON.parse(localData) : false;
  });
  const [filterBtn, setFilterBtn] = useState('all');
  // everytime list item changes it is stored in a localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(list));
  }, [list]);
  // everytime darkMode changes value it is stored in a localstorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);
  // fixes a bug when you refresh body style is not imedietly applyed so when app loads it sets it this only happends once
  useEffect(() => {
    const getStartingTheme = localStorage.getItem('theme');
    const startTheme = JSON.parse(getStartingTheme);
    if (startTheme) {
      document.body.className = 'dark';
    }
    if (!startTheme) {
      document.body.className = 'light';
    }
  }, []);
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

  const changeTheme = () => {
    if (!darkMode) {
      document.body.className = 'dark';
      setDarkMode(!darkMode);
    }
    if (darkMode) {
      document.body.className = 'light';
      setDarkMode(!darkMode);
    }
  };
  const filterTodo = (e) => {
    const targetBtn = e.target.textContent;
    setFilterBtn(targetBtn.toLowerCase());
  };
  // this filteres list based on filterBtn value
  const filteredTodos =
    filterBtn === 'all'
      ? list
      : filterBtn === 'active'
      ? list.filter((todo) => !todo.completed)
      : list.filter((todo) => todo.completed);
  return (
    <div className='app-container'>
      <div className='bg-container'>
        {darkMode ? (
          <div className=''>
            <img src={darkHeaderMobile} alt='' className='dbgm-img' />
            <img src={darkHeader} alt='' className='dbg-img' />
          </div>
        ) : (
          <div className=''>
            <img src={lightHeaderMobile} alt='' className='lbgm-img' />
            <img src={lightHeader} alt='' className='lbg-img' />
          </div>
        )}
      </div>
      <div className='todo-container'>
        <main>
          <div className='title-container'>
            <h1>TODO</h1>
            <button className='theme-changer-button' onClick={changeTheme}>
              {darkMode ? (
                <img src={sunImage} alt='' />
              ) : (
                <img src={moonImage} alt='' />
              )}
            </button>
          </div>
          <form className={darkMode ? 'form form-dark' : 'form'}>
            <input
              className='form-input'
              type='text'
              value={input}
              placeholder='create a new todo'
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className={darkMode ? 'submit-btn submit-btn-dark' : 'submit-btn'}
              type='submit'
              onClick={(e) => addItem(e, input)}
            >
              ADD
            </button>
          </form>
        </main>
        <div
          className={
            darkMode
              ? 'todo-items-container todo-items-container-dark'
              : 'todo-items-container'
          }
        >
          <TransitionGroup>
            {filteredTodos.map((todo) => {
              return (
                <CSSTransition key={todo.id} timeout={400} classNames='fade'>
                  <div className='item' key={todo.id}>
                    <input
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => completeTask(todo.id)}
                    />
                    <p className={todo.completed ? 'line' : ''}>{todo.todo}</p>
                    <button className='x' onClick={() => removeItem(todo.id)}>
                      <img src={cross} alt='' />
                    </button>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>

          <div className='todo-items-container-footer'>
            <p>{checkedAmount} items left</p>
            <div
              className={
                darkMode
                  ? 'filter-btn-container filter-btn-container-dark'
                  : 'filter-btn-container'
              }
            >
              <button
                className={filterBtn === 'all' ? 'active' : ''}
                onClick={(e) => filterTodo(e)}
              >
                All
              </button>
              <button
                className={filterBtn === 'active' ? 'active' : ''}
                onClick={(e) => filterTodo(e)}
              >
                Active
              </button>
              <button
                className={filterBtn === 'completed' ? 'active' : ''}
                onClick={(e) => filterTodo(e)}
              >
                Completed
              </button>
            </div>
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
