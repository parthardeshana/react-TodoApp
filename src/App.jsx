import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import UserId from "./userId";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [Items, setItems] = useState([]);
	const [inputList, setInputList] = useState("");
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(false);
	const [userIdList, setUserIdList] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	const setAllUserId = (resp, setUserIdList) => {
		const allUserIds = resp.map((todo) => todo.userId);
		const uniqUserId = [...new Set(allUserIds)];
		setUserIdList(uniqUserId);
	};

	useEffect(() => {
		setLoading(true);
		const url = "https://jsonplaceholder.typicode.com/todos";
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => {
				setLoading(false);
				setItems(resp);
				setAllUserId(resp, setUserIdList);
			});
	}, []);

	function itemEvent(e) {
		setInputList(e.target.value);
	}

	function addTodoItems() {
		console.log("aaaa", inputList);
		if (inputList !== "" && inputList !== " ") {
			setItems((oldItems) => {
				return [...oldItems, { title: inputList, completed: false }];
			});
		} else {
			console.log("Empty!! please add items ");
			setItems((oldItems) => {
				return [...oldItems];
			});
		}
		setInputList("");
	}
	const deleteItem = (id) => {
		// delete items
		const filteredItems = Items.slice(0, id).concat(
			Items.slice(id + 1, Items.length)
		);
		setItems(filteredItems);
	};
	let userSpecificDataShow = (id) => {
		// console.log(id);
		// let variable = id;
		// let newUserList = Items.filter((e) => e.userId === variable);
		// console.log("i am the specif", newUserList);
		setSelectedUserId(id);
		// now i wannt to do reset that aray after rendering
	};
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

	let todoListByUser = todoList;
	if(selectedUserId) {
		todoListByUser = todoList.filter((e) => e.userId === selectedUserId);
	}

	return (
		<>
			<div className="main_div">
				<div className="center_div">
					<h2>TODO List</h2>
					<div>
						<input
							style={{ fontSize: "20px" }}
							type="text"
							placeholder="Add a Item"
							value={inputList}
							onChange={itemEvent}
						/>
						<FontAwesomeIcon
							className="addBtn"
							onClick={addTodoItems}
							icon={faPlusCircle}
						/>
					</div>

					<div className="d-flex justify-content-between mt-5">
						<div>
						<h6 className="pl-5">User Id</h6>
							{userIdList.map((userId) => {
								return (
									<UserId
										userId={userId}
										key={userId}
										onUserChange={userSpecificDataShow}
									/>
								);
							})}
						</div>
						{loading && <div>LOADING....</div>}
						<div>
							<ul className="mr-5">
								{todoListByUser.map((todoItem, index) => {
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
							{!loading && (
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
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
