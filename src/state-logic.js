import priority from "./priority";

const exampleData = {
	projects: [
		{
			name: "Project 1",
			todos: [
				{
					title: "Todo 1",
					description: "This is todo number 1. Hip Hip!",
					dueDate: "01/01/2099",
					priority: priority.LOW,
					complete: false,
				},
				{
					title: "Todo 2",
					description: "This is todo number 2. Hurray!",
					dueDate: "01/01/3099",
					priority: priority.MEDIUM,
					complete: false,
				},
			],
		},
		{
			name: "Project 2",
			todos: [
				{
					title: "Todo 3",
					description: "This is todo number 3. Hip Hip!",
					dueDate: "01/01/2099",
					priority: priority.HIGH,
					complete: true,
				},
				{
					title: "Todo 4",
					description: "This is todo number 3. Hurray!",
					dueDate: "01/01/3099",
					priority: priority.URGENT,
					complete: false,
				},
			],
		},
	],
};

function todoFactory(title, description, dueDate, priority) {
	const id = Math.random();
	return {
		title,
		description,
		dueDate,
		priority,
		id,
	};
}

function projectFactory(name, todos = []) {
	const id = Math.random();
	return {
		name,
		todos: todos.map((todo) => {
			todoFactory(todo.title, todo.description, todo.dueDate, todo.priority);
		}),
		id,
		addTodo(title, description, dueDate, priority) {
			todos.push(todoFactory(title, description, dueDate, priority));
		},
		removeTodo(id) {
			todos = todos.filter((x) => x.id !== id);
		},
	};
}

function appFactory(data) {
	const result = {
		projects: data?.projects.map((project) =>
			projectFactory(project.name, project.todos),
		),
		printState() {
			console.log(this.projects);
		},
	};
	return result;
}

function getAppState() {
	const storageState = localStorage.getItem("appState");
	if (!storageState) {
		return appFactory(exampleData);
	}
	return appFactory(data);
}

export default getAppState;
