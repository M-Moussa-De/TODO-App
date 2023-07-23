import React from 'react';

interface Props {
	totalTasks: number;
	tasksPerPage: number;
	setCurrentPage: (page: number) => void;
}

export default function PaginationSys({
	totalTasks,
	tasksPerPage,
	setCurrentPage,
}: Props) {
	const pages: number[] = [];

	for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
		pages.push(i);
	}

	return (
		<ul className='pagination'>
			{pages.length > 1 && pages.map((page) => {
				return (
					<li key={page} onClick={() => setCurrentPage(page)}>
						{page}
					</li>
				);
			})}
		</ul>
	);
}
