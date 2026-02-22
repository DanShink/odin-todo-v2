export function renderProjects(state) {
	return state.projects
		.map(
			(p) => `
    <div class="project" data-id="${p.id}" data-highlight="${p.id === state.selectedProjectId}">
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
      ${t.title}
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
