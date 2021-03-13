import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimesCircle,
	faLocationArrow,
	faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

const TodoList = (props) => {
	return (
		<>
			<div className="d-flex justify-content-between">
				<li style={{ color: props.todoItem.completed ? "green" : "black" }}>
					{props.todoItem.title}
				</li>
				<div className="d-flex">
					<FontAwesomeIcon
						className="closeBtn icons"
						onClick={() => {
							props.onSelect(props.id);
						}}
						icon={faTimesCircle}
					/>
					<FontAwesomeIcon
						className="active icons"
						onClick={() => {
							props.notDone(props.todoItem);
						}}
						icon={faStopwatch}
					/>
					<FontAwesomeIcon
						className="done icons"
						onClick={() => {
							props.onDone(props.todoItem);
						}}
						icon={faLocationArrow}
					/>
				</div>
			</div>
		</>
	);
};

export default TodoList;
