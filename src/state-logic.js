import priority from "./priority";

const exampleData = {
	selectedProjectId: "p1",
	projects: [
		{
			name: "Project 1",
			id: "p1",
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
			id: "p2",
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

function todoFactory({
	title,
	description,
	dueDate,
	priority,
	complete = false,
	id,
}) {
	return {
		title,
		description,
		dueDate,
		priority,
		complete,
		id: id ?? crypto.randomUUID(),
	};
}

export function projectFactory({ name, todos = [], id }) {
	return {
		name,
		id: id ?? crypto.randomUUID(),
		todos: todos.map(todoFactory),
	};
}

function appFactory(data) {
	return {
		projects: data.projects.map(projectFactory),
		selectedProjectId: data.selectedProjectId ?? data.projects?.[0]?.id ?? null,
	};
}

function getAppState() {
	const storageState = localStorage.getItem("appState");
	if (!storageState) {
		return appFactory(exampleData);
	}
	return appFactory(JSON.parse(storageState));
}

const state = getAppState();

export default state;
