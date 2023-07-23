import React from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { MdOutlineDone } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import swal from 'sweetalert';
import Task from '../models/Task';

interface TodosListProps {
	tasksArray: Task[];
	setTasksArray: (tasks: Task[]) => void;
}

export default function TodosList({
	tasksArray,
	setTasksArray,
}: TodosListProps) {
	const handleMarkTaskDone = (id: string) => {
		const updatedTasks = [...tasksArray];

		const task = updatedTasks.find((task) => task.id === id);

		if (task) {
			task.done = !task.done;
			setTasksArray(updatedTasks);
		}
	};

	const handleEditTask = (id: string) => {
		const taskToUpdate = tasksArray.find((task) => task.id === id);

		swal({
			title: 'Edit Task',
			content: {
				element: 'input',
				attributes: {
					value: taskToUpdate?.name,
					type: 'text',
				},
			},
			buttons: {
				cancel: true,
				confirm: {
					text: 'Save',
					closeModal: false,
				},
			},
			dangerMode: true,
		}).then((newTaskName) => {
			if (newTaskName === null) {
				swal('Task update cancelled.', {
					icon: 'warning',
				});
				return;
			}

			const trimmedTaskName = newTaskName.trim();

			if (trimmedTaskName.length === 0) {
				swal('Please enter a valid task.', {
					icon: 'error',
				});
				return;
			}

			const updatedTasks = [...tasksArray];
			const taskToUpdate = updatedTasks.find((task) => task.id === id);

			if (taskToUpdate) {
				taskToUpdate.name = trimmedTaskName;
				setTasksArray(updatedTasks);
				swal('Your task has been updated!', {
					icon: 'success',
				});
			}
		});
	};

	const handleDeleteTask = (id: string) => {
		const updatedTasks = [...tasksArray];
		const taskToDelete = updatedTasks.find((task) => task.id === id);

		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this task!',
			icon: 'warning',
			buttons: {
				cancel: true,
				delete: true,
			},
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete && taskToDelete) {
				const index = updatedTasks.indexOf(taskToDelete);
				updatedTasks.splice(index, 1);
				setTasksArray(updatedTasks);
				swal('Your task has been deleted!', {
					icon: 'success',
				});
			} else {
				swal('Your task is safe!');
			}
		});
	};

	return (
		<ul className='tasks-list'>
			{tasksArray &&
				tasksArray.map((task) => (
					<li
						key={task.id}
						className='tasks-list-item'
						style={{ textDecoration: task.done ? 'line-through' : 'none' }}
					>
						{task.name.slice(0, 60)}

						<div
							className='action-btns'
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<button
								className='done-btn'
								onClick={() => handleMarkTaskDone(task.id)}
								style={{
									display: 'flex',
									alignItems: 'center',
									borderRadius: '50%',
									color: '#fff',
									opacity: '1',
									fontSize: '1rem',
								}}
							>
								<MdOutlineDone />
							</button>

							<button
								className='edit-btn'
								onClick={() => handleEditTask(task.id)}
								style={{
									display: 'flex',
									alignItems: 'center',
									borderRadius: '50%',
									color: '#fff',
									opacity: '1',
									fontSize: '1rem',
								}}
							>
								<CiEdit />
							</button>

							<button
								className='delete-btn'
								onClick={() => handleDeleteTask(task.id)}
								style={{
									display: 'flex',
									alignItems: 'center',
									borderRadius: '50%',
									color: '#fff',
									opacity: '1',
									fontSize: '1rem',
								}}
							>
								<RiDeleteBin4Line />
							</button>
						</div>
					</li>
				))}
		</ul>
	);
}
