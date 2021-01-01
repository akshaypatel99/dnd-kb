import { Grid, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled(Grid)({
	margin: '8px',
	border: '1px solid lightgrey',
	borderRadius: '2px',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#E86F51',
});

const Title = styled(Typography)({
	padding: '8px',
	fontSize: '2rem',
	backgroundColor: '#274754',
	color: 'white',
});

const Tasklist = styled(Grid)({
	padding: '8px',
	flexDirection: 'column',
	flexGrow: 1,
	minHeight: '100px',
});

const Column = (props) => {
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<Container
					container
					{...provided.draggableProps}
					innerRef={provided.innerRef}
				>
					<Title {...provided.dragHandleProps}>{props.column.title}</Title>
					<Droppable droppableId={props.column.id} type='task'>
						{(provided, snapshot) => {
							const style = {
								backgroundColor: snapshot.isDraggingOver
									? '#5D9EA6'
									: '#2B678C',
								...provided.droppableProps.style,
							};
							return (
								<Tasklist
									container
									innerRef={provided.innerRef}
									{...provided.droppableProps}
									isDraggingOver={snapshot.isDraggingOver}
									style={style}
								>
									{props.tasks.map((task, index) => (
										<Task key={task.id} task={task} index={index} />
									))}
									{provided.placeholder}
								</Tasklist>
							);
						}}
					</Droppable>
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
