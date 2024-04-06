{
	const tasks = [
		{
			content: "zrobić obiad",
			done: false,
		},
		{
			content: "zjeść śniadanie",
			done: true,
		},
	];

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});

		render();
	};

	const removeTask = (taskIndex) => {
		tasks.splice(taskIndex, 1);
		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;
		render();
	};

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const toggleDoneButtons = document.querySelectorAll(".js-done");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	};

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
        <li class="task${
					task.done ? " taskDone" : ""
				}">
		<button class="task__button js-done"><i class="fa-solid fa-check${
			task.done ? "" : " task__buttonIcon"
		}"></i></button>
        ${task.content}
		<button class="task__button task__button--remove js-remove"><i class="fa-regular fa-trash-can"></i></button>
        </li>
        `;
		}

		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

    const input = document.querySelector(".js-newTask");
		const newTaskContent = input.value.trim();
		if (newTaskContent === "") {
			return;
		}

		addNewTask(newTaskContent);
    input.value = "";
    input.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}
