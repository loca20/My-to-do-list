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

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
        <li>
        ${task.content}
        </li>
        `;
		}

        document.querySelector(".js-tasks").innerHTML = htmlString;
	};

	const init = () => {
        render();
    };

	init();
}