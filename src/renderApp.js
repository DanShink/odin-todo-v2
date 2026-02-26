export function renderProjects(state) {
	return state.projects
		.map(
			(p) => `
    <div class="project ${p.id === state.selectedProjectId ? "projectSelected" : ""}" data-id="${p.id}">
      ${p.name}
    </div>
    `,
		)
		.join("");
}

export function renderTodos(state) {
	return state.projects
		.find((p) => p.id === state.selectedProjectId)
		.todos.map(
			(t) => `
    <div data-id="${t.id}">
      ${t.title}: ${t.description}
    </div>
    `,
		)
		.join("");
}

export default function renderApp(state) {
	document.querySelector("#projects-container").innerHTML =
		renderProjects(state);
	document.querySelector("#todos-container").innerHTML = renderTodos(state);
}
