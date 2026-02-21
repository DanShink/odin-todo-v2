import state, { projectFactory } from "./state-logic";

function findProject(id) {
	return state.project.find((p) => p.id === id);
}

export function addTodo(projectId, todoData) {
	const project = findProject(id);
	if (!project) return;
	project.todos.push(todoFactory(todoData));
}

export function removeTodo(projectId, todoId) {
	const project = findProject(id);
	if (!project) return;
	project.todos = project.todos.filter((t) => t.id !== todoId);
}

export function addProject(name) {
	state.projects.push(projectFactory(name, [], null));
}

export function renameProject(id, name) {
	const project = findProject(id);
	if (!project) return;
	project.name = name;
}

export function removeProject(id) {
	state.projects = state.projects.filter((p) => p.id !== id);
}

export function printState() {
	console.log(state);
}
