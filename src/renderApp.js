import { format } from "date-fns";
import priority from "./priority";

export function renderProjects(state) {
	const container = document.createDocumentFragment();
	state.projects.forEach((p) => {
		const projectDiv = document.createElement("div");
		projectDiv.className = `project ${p.id === state.selectedProjectId ? "projectSelected" : ""}`;
		projectDiv.dataset.id = p.id;
		projectDiv.textContent = p.name;
		const button = document.createElement("button");
		button.textContent = "Delete";
		button.className = "delete";
		button.dataset.projectId = p.id;
		projectDiv.appendChild(button);

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
		const dueDate = document.createElement("p");
		const dueDateSafe =
			t.dueDate === ""
				? "Invalid Time"
				: format(new Date(t.dueDate), "MM-dd-yyyy HH:mm");
		dueDate.textContent = dueDateSafe;
		const todoPriority = document.createElement("P");
		todoPriority.textContent = priority[t.priority];
		const edit = document.createElement("button");
		edit.textContent = "Edit";
		edit.className = "edit";
		edit.dataset.todoId = t.id;
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "delete";
		deleteButton.dataset.todoId = t.id;
		title.appendChild(edit);
		title.appendChild(deleteButton);
		div.appendChild(description);
		div.appendChild(dueDate);
		div.appendChild(todoPriority);

		container.appendChild(div);
	});

	const dialog = document.getElementById("edit-todo-popup");
	const form = document.createElement("form");
	form.method = "dialog";
	form.id = "edit-todo-form";

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

function renderPriority(priority, index) {
	const option = document.createElement("option");
	option.value = index;
	option.innerText = priority;
	return option;
}

function renderPriorityOptions() {
	const result = document.createDocumentFragment();
	priority.forEach((p, index) => {
		result.appendChild(renderPriority(p, index));
	});
	return result;
}

export function renderAddTodo() {
	const form = document.createElement("form");
	form.method = "dialog";
	form.id = "add-todo-form";

	const titleContainer = document.createElement("div");
	titleContainer.className = "field-container";

	const titleLabel = document.createElement("label");
	titleLabel.setAttribute("for", "add-todo-title");
	titleLabel.textContent = "Title:";

	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.name = "name";
	titleInput.id = "add-todo-title";
	titleInput.required = true;

	const descriptionContainer = document.createElement("div");
	descriptionContainer.className = "field-container";

	const descriptionLabel = document.createElement("label");
	descriptionLabel.setAttribute("for", "add-todo-description");
	descriptionLabel.textContent = "Description:";

	const descriptionInput = document.createElement("input");
	descriptionInput.type = "text";
	descriptionInput.name = "description";
	descriptionInput.id = "add-todo-description";
	descriptionInput.required = true;

	const dueDateContainer = document.createElement("div");
	dueDateContainer.className = "field-container";

	const dueDateLabel = document.createElement("label");
	dueDateLabel.setAttribute("for", "add-todo-due-date");
	dueDateLabel.textContent = "Due Date:";

	const dueDateInput = document.createElement("input");
	dueDateInput.type = "datetime-local";
	dueDateInput.name = "dueDate";
	dueDateInput.id = "add-todo-due-date";
	dueDateInput.required = false;

	const priorityContainer = document.createElement("div");
	priorityContainer.className = "field-container";

	const priorityLabel = document.createElement("label");
	priorityLabel.setAttribute("for", "add-todo-priority");
	priorityLabel.textContent = "Priority:";

	const priorityInput = document.createElement("select");
	priorityInput.name = "priority";
	priorityInput.id = "add-todo-priority";
	priorityInput.required = true;
	priorityInput.appendChild(renderPriorityOptions());

	const header = document.createElement("p");
	header.textContent = "Add a Todo";

	const createButton = document.createElement("button");
	createButton.innerText = "Submit";
	createButton.type = "submit";

	const closeButton = document.createElement("button");
	closeButton.setAttribute("commandfor", "add-todo-popup");
	closeButton.setAttribute("command", "close");
	closeButton.innerText = "Close";
	closeButton.type = "button";

	titleContainer.appendChild(titleLabel);
	titleContainer.appendChild(titleInput);

	descriptionContainer.appendChild(descriptionLabel);
	descriptionContainer.appendChild(descriptionInput);

	dueDateContainer.appendChild(dueDateLabel);
	dueDateContainer.appendChild(dueDateInput);

	priorityContainer.appendChild(priorityLabel);
	priorityContainer.appendChild(priorityInput);

	form.appendChild(header);
	form.appendChild(titleContainer);
	form.appendChild(descriptionContainer);
	form.appendChild(dueDateContainer);
	form.appendChild(priorityContainer);
	form.appendChild(createButton);
	form.appendChild(closeButton);
	const addTodoModal = document.querySelector("#add-todo-popup");
	addTodoModal.innerHTML = "";
	addTodoModal.appendChild(form);
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
	descriptionLabel.textContent = "Description:";

	const descriptionInput = document.createElement("input");
	descriptionInput.type = "text";
	descriptionInput.name = "description";
	descriptionInput.id = "edit-todo-description";
	descriptionInput.required = true;
	descriptionInput.value = todo.description;

	const dueDateContainer = document.createElement("div");
	dueDateContainer.className = "field-container";

	const dueDateLabel = document.createElement("label");
	dueDateLabel.setAttribute("for", "edit-todo-due-date");
	dueDateLabel.textContent = "Due Date:";

	const dueDateInput = document.createElement("input");
	dueDateInput.type = "datetime-local";
	dueDateInput.name = "description";
	dueDateInput.id = "edit-todo-due-date";
	dueDateInput.required = false;
	dueDateInput.value = todo.dueDate;

	const priorityContainer = document.createElement("div");
	priorityContainer.className = "field-container";

	const priorityLabel = document.createElement("label");
	priorityLabel.setAttribute("for", "edit-todo-priority");
	priorityLabel.textContent = "Priority:";

	const priorityInput = document.createElement("select");
	priorityInput.name = "priority";
	priorityInput.id = "edit-todo-priority";
	priorityInput.required = true;
	priorityInput.appendChild(renderPriorityOptions());

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

	dueDateContainer.appendChild(dueDateLabel);
	dueDateContainer.appendChild(dueDateInput);

	priorityContainer.appendChild(priorityLabel);
	priorityContainer.appendChild(priorityInput);

	form.appendChild(header);
	form.appendChild(titleContainer);
	form.appendChild(descriptionContainer);
	form.appendChild(dueDateContainer);
	form.appendChild(priorityContainer);
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
