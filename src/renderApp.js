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
		title.appendChild(edit);
		div.appendChild(description);

		container.appendChild(div);
	});

	const dialog = document.getElementById("edit-todo-popup");
	const form = document.createElement("form");
	form.method = "dialog";
	form.id = "edit-todo-form";

	const nameContainer = document.createElement("div");
	nameContainer.className = "field-container";

	const nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "todo-name");
	nameLabel.textContent = "Enter the name of the project:";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.name = "name";
	nameInput.id = "project-name";
	nameInput.required = true;

	dialog.innerHTML = "";
	dialog.appendChild(form);

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

export function renderEditTodo(todo) {
	console.log(todo);
	const form = document.getElementById("edit-todo-form");
	form.innerHTML = "";
	const titleContainer = document.createElement("div");
	titleContainer.className = "field-container";

	const titleLabel = document.createElement("label");
	titleLabel.setAttribute("for", "edit-todo-title");
	titleLabel.textContent = "Title:";

	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.name = "title";
	titleInput.id = "edit-todo-name";
	titleInput.required = true;
	titleInput.value = todo.title;

	const descriptionContainer = document.createElement("div");
	descriptionContainer.className = "field-container";

	const descriptionLabel = document.createElement("label");
	descriptionLabel.setAttribute("for", "edit-todo-description");
	descriptionLabel.textContent = "Title:";

	const descriptionInput = document.createElement("input");
	descriptionInput.type = "text";
	descriptionInput.name = "description";
	descriptionInput.id = "edit-todo-description";
	descriptionInput.required = true;
	descriptionInput.value = todo.description;

	const header = document.createElement("p");
	header.textContent = "Edit Todo";

	const createButton = document.createElement("button");
	createButton.innerText = "Submit";
	createButton.type = "submit";

	const closeButton = document.createElement("button");
	closeButton.setAttribute("commandfor", "edit-todo-popup");
	closeButton.setAttribute("command", "close");
	closeButton.innerText = "Close";
	closeButton.type = "button";

	titleContainer.appendChild(titleLabel);
	titleContainer.appendChild(titleInput);

	descriptionContainer.appendChild(descriptionLabel);
	descriptionContainer.appendChild(descriptionInput);

	form.appendChild(header);
	form.appendChild(titleContainer);
	form.appendChild(descriptionContainer);
	form.appendChild(createButton);
	form.appendChild(closeButton);
	const editTodoModal = document.getElementById("edit-todo-popup");
	editTodoModal.innerHTML = "";
	editTodoModal.appendChild(form);
}

export default function renderApp(state) {
	const projectsContainer = document.querySelector("#projects-container");
	const todosContainer = document.querySelector("#todos-container");

	projectsContainer.innerHTML = "";
	todosContainer.innerHTML = "";

	projectsContainer.appendChild(renderProjects(state));
	todosContainer.appendChild(renderTodos(state));
}
