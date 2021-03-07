import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";

function App(props) {
	const [todoData, setTodoData] = useState([]);
	const [inputList, setInputList] = useState("");
	const [Items, setItems] = useState(props.data);
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const url = "https://jsonplaceholder.typicode.com/todos";
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => setTodoData(resp));
	}, []);

	console.log("i am the api fake data ::", todoData);

	function itemEvent(e) {
		setInputList(e.target.value);
	}

	function addTodoItems() {
		setItems((oldItems) => {
			return [...oldItems, { title: inputList, completed: false }];
		});
		setInputList("");
	}
	function deleteItem(id) {
		// delete particular item
		const filteredItems = Items.slice(0, id).concat(
			Items.slice(id + 1, Items.length)
		);
		setItems(filteredItems);
	}

	function doneItem(todoItem) {
		todoItem.completed = true;
		let tempArr = [...Items];
		setItems(tempArr);
	}
	function notItem(todoItem) {
		todoItem.completed = false;
		let tempArr = [...Items];
		setItems(tempArr);
	}
	const completedTask = () => {
		setFilter("completed");
	};
	const remainingTask = () => {
		setFilter("active");
	};
	const allTask = () => {
		setFilter("all");
	};
	let todoList = [];

	if (filter === "active") {
		todoList = Items.filter((todoItem) => !todoItem.completed);
	} else if (filter === "completed") {
		todoList = Items.filter((todoItem) => todoItem.completed);
	} else {
		todoList = Items;
	}

	return (
		<>
			<div className="main_div">
				<div className="center_div">
					<h1>TODO List</h1>
					<input
						type="text"
						placeholder="Add a Item"
						value={inputList}
						onChange={itemEvent}
					/>
					<button className="plusBtn" onClick={addTodoItems}>
						+
					</button>
					<ul>
						{todoList.map((todoItem, index) => {
							return (
								<TodoList
									key={index}
									id={index}
									todoItem={todoItem}
									onSelect={deleteItem}
									onDone={doneItem}
									notDone={notItem}
								/>
							);
						})}
					</ul>
					<div className="listBtn">
						<button className="myBtn" onClick={completedTask}>
							Completed Task
						</button>
						<button className="myBtn" onClick={remainingTask}>
							Active Task
						</button>
						<button className="myBtn" onClick={allTask}>
							All Task
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
