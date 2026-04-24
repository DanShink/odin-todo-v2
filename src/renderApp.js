export function renderProjects(state) {
	const container = document.createDocumentFragment();
	state.projects.forEach((p) => {
		const projectDiv = document.createElement("div");
		projectDiv.className = `project ${p.id === state.selectedProjectId ? "projectSelected" : ""}`;
		projectDiv.dataset.id = p.id;
		projectDiv.textContent = p.name;

		container.appendChild(projectDiv);
	});
	return container;
}

export function renderTodos(state) {
	const container = document.createDocumentFragment();

	const project = state.projects.find((p) => p.id === state.selectedProjectId);

	if (!project) return container;

	const todoDialog = document.getElementById("edit-todo-popup");

	project.todos.forEach((t) => {
		const div = document.createElement("div");
		div.dataset.id = t.id;
		div.className = "todo";
		const title = document.createElement("h3");
		title.textContent = t.title;
		div.appendChild(title);
		const description = document.createElement("p");
		description.textContent = t.description;
		const edit = document.createElement("button");
		edit.textContent = "Edit";
		edit.className = "edit";
		edit.dataset.id = t.id;
		edit.command = "show-modal";
		edit.commandForElement = todoDialog;
		title.appendChild(edit);
		div.appendChild(description);

		container.appendChild(div);
	});

	return container;
}

export function renderAddProject() {
	const form = document.createElement("form");
	form.method = "dialog";
	form.id = "add-project-form";

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
	const projectModal = document.querySelector("#add-project-popup");
	projectModal.innerHTML = "";
	projectModal.appendChild(form);
}

export function renderEditTodo() {
	const form = document.createElement("form");
	form.method = "dialog";
	form.id = "edit-todo-form";

	const nameContainer = document.createElement("div");
	nameContainer.className = "field-container";

	const nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "todo-title");
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
	const projectModal = document.querySelector("#add-project-popup");
	projectModal.innerHTML = "";
	projectModal.appendChild(form);
}

export default function renderApp(state) {
	const projectsContainer = document.querySelector("#projects-container");
	const todosContainer = document.querySelector("#todos-container");

	projectsContainer.innerHTML = "";
	todosContainer.innerHTML = "";

	projectsContainer.appendChild(renderProjects(state));
	todosContainer.appendChild(renderTodos(state));
}
