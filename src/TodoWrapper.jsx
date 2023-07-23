import React, { useState, useEffect } from 'react';
import { LiaTasksSolid } from 'react-icons/lia';
import TodosList from './components/TodosList.tsx';
import TodoForm from './components/TodoForm.tsx';
import PaginationSys from './components/PaginationSys.tsx';

export default function TodoWrapper() {
  const [tasksArray, setTasksArray] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasksArray(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }, [tasksArray]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(8);

  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;

  const newTasksArray = tasksArray.slice(firstTaskIndex, lastTaskIndex);

  return (
    <section className='content'>
      <h5 className='header'>
        TODO App <LiaTasksSolid style={{ marginLeft: '3px' }} />
      </h5>

      <TodoForm tasksArray={tasksArray} setTasksArray={setTasksArray} />

      {tasksArray.length === 0 ? (
        <span style={{ display: 'block', textAlign: 'center', color: '#fff' }}>
          No tasks yet!
        </span>
      ) : (
        <>
          <TodosList tasksArray={newTasksArray} setTasksArray={setTasksArray} />

          <PaginationSys
            totalTasks={tasksArray.length}
            tasksPerPage={tasksPerPage}
			currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}
