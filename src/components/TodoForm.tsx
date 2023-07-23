import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { IoIosAdd } from 'react-icons/io';
import Task from '../models/Task';

export default function TodoForm({ tasksArray, setTasksArray }) {
	uuidv4();

	const [newTask, setNewTask] = useState<Task>({
		id: '',
		name: '',
		done: false,
		isBeingEdited: false,
	});

	function handleSubmit(ev: React.FormEvent) {
		ev.preventDefault();

		const trimmedTask = newTask.name.trim();
		if (trimmedTask.length === 0) {
			toast.error('No task to add!');
			return;
		}

		const formattedTask =
			trimmedTask.charAt(0).toUpperCase() + trimmedTask.slice(1).toLowerCase();

		if (tasksArray.some((task: Task) => task.name === formattedTask)) {
			toast.warning('Task exists!');
			setNewTask({ ...newTask, name: '' });
			return;
		}

		setTasksArray([
			...tasksArray,
			{ id: uuidv4(), name: formattedTask, done: false, isBeingEdited: false },
		]);
		toast.success('Task added successfully!');
		setNewTask({ ...newTask, name: '' });
	}

	return (
		<form className='addTaskForm' onSubmit={handleSubmit}>
			<input
				type='text'
				value={newTask.name}
				placeholder='What do you have to get it done?'
				spellCheck='false'
				onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
			/>
			<button className='addTask-btn'>
				<IoIosAdd style={{ marginRight: '3px' }} /> Add task
			</button>
		</form>
	);
}
