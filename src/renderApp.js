import { addProject } from "./state-mutations";

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
	const projectModal = document.querySelector("#add-project-popup");
	projectModal.innerHTML = "";
	projectModal.appendChild(renderAddProject(state));
}

export function renderAddProject(state) {
	const form = document.createElement("form");
	form.method = "dialog";
	const dialog = document.querySelector("#add-project-popup");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const projectName = form.querySelector("#project-name");
		if (!projectName.value) return;
		state.selectedProjectId = addProject(projectName.value);
		console.log(projectName.value);
		renderApp(state);
		dialog.close();
	});

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
	createButton.innerText = "Submit";
	createButton.type = "submit";

	const closeButton = document.createElement("button");
	closeButton.setAttribute("commandfor", "add-project-popup");
	closeButton.setAttribute("command", "close");
	closeButton.innerText = "Close";
	closeButton.type = "button";

	nameContainer.appendChild(nameLabel);
	nameContainer.appendChild(nameInput);

	form.appendChild(header);
	form.appendChild(nameContainer);
	form.appendChild(createButton);
	form.appendChild(closeButton);
	return form;
}
