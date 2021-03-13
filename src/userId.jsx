import React from "react";

function UserId(props) {
	return (
		<>
			<div>
				<button
					className="btn btn-outline-success mt-2 ml-5"
					onClick={() => {
						props.onUserChange(props.userId);
					}}
				>
					{props.userId}
				</button>
			</div>
		</>
	);
}

export default UserId;
