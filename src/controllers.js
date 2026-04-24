import renderApp from "./renderApp";
import state from "./state-logic";
import { setSelectedProject, addProject } from "./state-mutations";

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
		e.preventDefault();

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
	todos.addEventListener("click", (e) => {
		const todo = e.target.closest(".edit");
		if (!todo) return;
		const todoId = todo.dataset.id;
		if (!todoId) return;
	});
}
