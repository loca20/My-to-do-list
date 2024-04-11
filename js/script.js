{
	let tasks = [
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
		tasks = [
			...tasks, 
			{ content: newTaskContent },
		];

		render();
	};

	const removeTask = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex), 
			...tasks.slice(taskIndex + 1),
		];

		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			{
				...tasks[taskIndex],
				done: !tasks[taskIndex].done,
			},
			...tasks.slice(taskIndex + 1),
		];

		render();
	};

	const markAllTasksDone = () => {
		tasks = tasks.map((task) => ({
			...task,
			done: true,
		}));

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

	const bindButtonsEvents = () => {
		const markAllTasksDoneButton = document.querySelector(
			".js-markAllTasksDoneButton"
		);

		markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
	};

	const renderTasks = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
        <li class="task${task.done ? " taskDone" : ""}">
		<button class="task__button js-done"><i class="fa-solid fa-check${
			task.done ? "" : " task__buttonIcon"
		}"></i></button>
        ${task.content}
		<button class="task__button task__button--remove js-remove"><i class="fa-regular fa-trash-can"></i></button>
        </li>
        `;
		}

		document.querySelector(".js-tasks").innerHTML = htmlString;
	};

	const renderButtons = () => {
		let buttons = "";
		if (tasks.length > 0) {
			buttons = `
		<button class="section__button">Ukryj ukończone</button>
		<button class="section__button ${tasks.every(({done}) => done) ? "section__button--disabled" : ""} js-markAllTasksDoneButton">Ukończ wszystkie</button>`;
		} else {
			buttons = "";
		}
		document.querySelector(".js-buttons").innerHTML = buttons;
	};

	const render = () => {
		renderTasks();
		renderButtons();
		bindEvents();
		bindButtonsEvents();
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
