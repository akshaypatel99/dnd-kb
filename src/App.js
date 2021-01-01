import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

import './App.css';

const Container = styled(Grid)({
	display: 'flex',
});

const Title = styled(Typography)({
	marginBottom: '1rem',
	fontSize: '3rem',
	color: '#082C3F',
});

const App = () => {
	const [state, setState] = useState(initialData);

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...state,
				columnOrder: newColumnOrder,
			};

			setState(newState);
			return;
		}

		const start = state.columns[source.droppableId];
		const finish = state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};

			setState(newState);
			return;
		}

		// Moving from one list to another
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		setState(newState);
		return;
	};

	return (
		<div className='App'>
			<Title>Drag'n'Drop Kanban Board</Title>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId='all-columns'
					direction='horizontal'
					type='column'
				>
					{(provided) => (
						<Container
							{...provided.droppableProps}
							innerRef={provided.innerRef}
						>
							{state.columnOrder.map((columnId, index) => {
								const column = state.columns[columnId];
								const tasks = column.taskIds.map(
									(taskId) => state.tasks[taskId]
								);

								return (
									<Column
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>
								);
							})}
							{provided.placeholder}
						</Container>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default App;
