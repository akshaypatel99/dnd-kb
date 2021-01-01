import { Grid, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core/styles';

const Container = styled(Grid)({
	border: '1px solid #D9AD5B',
	borderRadius: '2px',
	padding: '8px',
	marginBottom: '8px',
});

const Task = (props) => {
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided, snapshot) => {
				const style = {
					backgroundColor: snapshot.isDragging ? '#F2E0C9' : '#E8C468',
					...provided.draggableProps.style,
				};
				return (
					<Container
						item
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						innerRef={provided.innerRef}
						isDragging={snapshot.isDragging}
						style={style}
					>
						<Typography>{props.task.content}</Typography>
					</Container>
				);
			}}
		</Draggable>
	);
};

export default Task;
