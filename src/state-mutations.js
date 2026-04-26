import state, { projectFactory } from "./state-logic";

export function printState() {
	console.log(state);
}

function saveState() {
	localStorage.setItem("appState", JSON.stringify(state));
	printState();
}

function findProject(id) {
	return state.projects.find((p) => p.id === id);
}

export function getTodo(projectId, todoId) {
	const project = findProject(projectId);
	if (!project) return undefined;
	return project.todos.find((todo) => todo.id == todoId);
}

export function addTodo(projectId, todoData) {
	const project = findProject(projectId);
	if (!project) return;
	project.todos.push(todoFactory(todoData));
	saveState();
}

export function removeTodo(projectId, todoId) {
	const project = findProject(projectId);
	if (!project) return;
	project.todos = project.todos.filter((t) => t.id !== todoId);
	saveState();
}

export function editTodo(projectId, todo) {
	const project = findProject(projectId);
	if (!project) return;
	const newTodo = project.todos.findIndex((t) => t.id == todo.id);
	if (newTodo < 0) return;
	console.log(todo);
	project.todos[newTodo] = {
		...project.todos[newTodo],
		...todo,
	};
	saveState();
}

export function addProject(name) {
	const newProject = projectFactory({ name, todos: [], id: null });
	state.projects.push(newProject);
	saveState();
	return newProject.id;
}

export function renameProject(id, name) {
	const project = findProject(id);
	if (!project) return;
	project.name = name;
	saveState();
}

export function removeProject(id) {
	state.projects = state.projects.filter((p) => p.id !== id);
	saveState();
}

export function setSelectedProject(id) {
	state.selectedProjectId = id;
	saveState();
}
