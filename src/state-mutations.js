import state, { projectFactory } from "./state-logic";

export function printState() {
	console.log(state);
}

function saveState() {
	localStorage.setItem("appState", JSON.stringify(state));
	printState();
}

function findProject(id) {
	return state.project.find((p) => p.id === id);
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

export function addProject(name) {
	state.projects.push(projectFactory(name, [], null));
	saveState();
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
