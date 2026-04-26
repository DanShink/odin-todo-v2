import renderApp, { renderEditTodo } from "./renderApp";
import state from "./state-logic";
import {
	setSelectedProject,
	addProject,
	getTodo,
	editTodo,
} from "./state-mutations";

export function setupProjectsController() {
	document
		.getElementById("projects-container")
		.addEventListener("click", (e) => {
			const item = e.target.closest(".project");
			if (!item) return;
			const pId = item.getAttribute("data-id");
			if (!pId) return;
			setSelectedProject(pId);
			renderApp(state);
		});
}

export function setupAddProjectsController() {
	const form = document.getElementById("add-project-form");
	const dialog = document.getElementById("add-project-popup");
	form.addEventListener("submit", (e) => {
		const projectName = form.querySelector("#project-name");
		if (!projectName.value) return;
		state.selectedProjectId = addProject(projectName.value);
		console.log(projectName.value);
		renderApp(state);
		form.reset();
		dialog.close();
	});
}

export function setupEditTodosController() {
	const todos = document.getElementById("todos-container");
	const dialog = document.getElementById("edit-todo-popup");
	todos.addEventListener("click", (e) => {
		const todoEdit = e.target.closest(".edit");
		if (!todoEdit) return;
		const todoId = todoEdit.dataset.id;
		if (!todoId) return;
		dialog.dataset.todoId = todoId;
		const todo = getTodo(state.selectedProjectId, todoId);
		if (!todo) return;
		renderEditTodo(todo);
		dialog.showModal();
	});
	dialog.addEventListener("submit", (e) => {
		const form = document.getElementById("edit-todo-form");
		const todoTitle = form.querySelector("#edit-todo-name");
		const todoDescription = form.querySelector("#edit-todo-description");
		editTodo(state.selectedProjectId, {
			id: dialog.dataset.todoId,
			title: todoTitle.value,
			description: todoDescription.value,
		});
		renderApp(state);
		form.reset();
		dialog.close();
	});
}
