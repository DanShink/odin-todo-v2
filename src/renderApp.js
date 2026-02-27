import { setSelectedProject, addProject } from "./state-mutations";

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

export function renderAddProject() {
	const form = document.createElement("form");
	form.method = "dialog";

	const nameContainer = document.createElement("div");
	nameContainer.className = "field-container";

	const nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "project-name");
	nameLabel.textContent = "Enter the name of the project:";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.name = "name";
	nameInput.id = "project-name";
	nameInput.required = true;

	const header = document.createElement("p");
	header.textContent = "Add a Project";

	const createButton = document.createElement("button");
	createButton.setAttribute("commandfor", "add-project-popup");
	createButton.setAttribute("command", "close");
	createButton.innerText = "Submit";
	createButton.type = "button";

	nameContainer.appendChild(nameLabel);
	nameContainer.appendChild(nameInput);

	form.appendChild(header);
	form.appendChild(nameContainer);
	form.appendChild(createButton);
	return form;
}

export default function renderApp(state) {
	document.querySelector("#projects-container").innerHTML =
		renderProjects(state);
	document.querySelector("#todos-container").innerHTML = renderTodos(state);
	const projectModal = document.querySelector("#add-project-popup");
	projectModal.innerHTML = "";
	projectModal.appendChild(renderAddProject());
}
