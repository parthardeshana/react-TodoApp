import React from "react";

const TodoList = (props) => {
	// console.log("my propsss", props);
	
	return (
		<>
			<div className="ToDoList_style">
				<h3 
					className="closeBtn"
					onClick={() => {
						props.onSelect(props.id);
					}}
				>
					x
				</h3>
				<h3
					className="done"
					onClick={() => {
						props.onDone(props.todoItem);
					}}
				>
					Done
				</h3>
				<h3
					className="notdone"
					onClick={() => {
						props.notDone(props.todoItem);
					}}
				>
					Active
				</h3>
				<li style={{ color: props.todoItem.completed ? "green" : "black" }}>
					{props.todoItem.title}
				</li>
			</div>
		</>
	);
};

export default TodoList;
