{
	let tasks = [];
	let hideDoneTasks = false;

	const render = () => {
		renderTasks();
		bindListEvents();

		renderButtons();
		bindButtonEvents();
	};

	const renderTasks = () => {
		const taskToHTML = (task) => `
      <li class="
        toDoList__item ${
			task.done && hideDoneTasks ? "toDoList__item--hidden" : ""
		}">
        <button class="toDoList__button js-toggleDoneButton">
          ${task.done ? "✖" : "✔"}
        </button>
        <span ${task.done ? "style='text-decoration: line-through'" : ""}>
          ${task.content}
        </span>          
        <button class="toDoList__button toDoList__button--remove js-removeButton">
          🗑
        </button>
      </li>
    `;

		const tasksElement = document.querySelector(".js-tasks");
		tasksElement.innerHTML = tasks.map(taskToHTML).join("");
	};

	const renderButtons = () => {
		const buttonsElement = document.querySelector(".js-buttons");

		if (!tasks.length) {
			buttonsElement.innerHTML = "";
			return;
		}

		buttonsElement.innerHTML = `
      <button class="buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Show" : "Hide"} done
      </button>
      <button class="buttons__button js-markAllDone" ${
			tasks.every(({ done }) => done) ? " disabled" : ""
		}>
        Finish all tasks
      </button>
	  <button class="buttons__button js-deleteAllTasks">
		Delete all
	  </button>
    `;
	};

	const bindButtonEvents = () => {
		const markAllDoneButton = document.querySelector(".js-markAllDone");

		if (markAllDoneButton) {
			markAllDoneButton.addEventListener("click", markAllTasksDone);
		}

		const toggleHideDoneTasksButton = document.querySelector(
			".js-toggleHideDoneTasks"
		);

		if (toggleHideDoneTasksButton) {
			toggleHideDoneTasksButton.addEventListener(
				"click",
				toggleHideDoneTasks
			);
		}

		const deleteAllTasksButton = document.querySelector(".js-deleteAllTasks");

		if (deleteAllTasksButton) {
			deleteAllTasksButton.addEventListener("click", () => {
				tasks = [];
				render();
			});
		}
	};

	const bindListEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(
			".js-toggleDoneButton"
		);

		toggleDoneButtons.forEach((toggleDoneButton, buttonIndex) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(buttonIndex);
			});
		});

		const removeTaskButtons = document.querySelectorAll(".js-removeButton");

		removeTaskButtons.forEach((removeTaskButton, removeButtonIndex) => {
			removeTaskButton.addEventListener("click", () => {
				removeTask(removeButtonIndex);
			});
		});
	};

	const removeTask = (buttonIndex) => {
		tasks = [
			...tasks.slice(0, buttonIndex),
			...tasks.slice(buttonIndex + 1),
		];

		render();
	};

	const toggleTaskDone = (buttonIndex) => {
		tasks = [
			...tasks.slice(0, buttonIndex),
			{
				...tasks[buttonIndex],
				done: !tasks[buttonIndex].done,
			},
			...tasks.slice(buttonIndex + 1),
		];

		render();
	};

	const addNewTask = (newTaskContent) => {
		tasks = [...tasks.slice(0), { content: newTaskContent }];

		render();
	};

	const markAllTasksDone = () => {
		tasks = tasks.map((task) => ({
			...task,
			done: true,
		}));

		render();
	};

	const toggleHideDoneTasks = () => {
		hideDoneTasks = !hideDoneTasks;

		render();
	};

	const afterFormSubmit = (newTask) => {
		const newTaskContent = newTask.value.trim();

		newTask.focus();
		newTask.value = "";

		if (newTaskContent === "") return;

		addNewTask(newTaskContent);
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTask = document.querySelector(".js-newTask");

		afterFormSubmit(newTask);
	};

	const init = () => {
		const formElement = document.querySelector(".js-form");

		formElement.addEventListener("submit", onFormSubmit);
	};

	init();
}
