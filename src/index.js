import "./styles.css";
import state from "./state-logic";
import renderApp, { renderAddProject, renderAddTodo } from "./renderApp";
import {
	setupAddProjectsController,
	setupAddTodosController,
	setupDeleteProjectController,
	setupDeleteTodosController,
	setupEditTodosController,
	setupProjectsController,
} from "./controllers";

renderApp(state);
renderAddProject();
renderAddTodo();
setupProjectsController();
setupAddProjectsController();
setupDeleteProjectController();
setupAddTodosController();
setupEditTodosController();
setupDeleteTodosController();
