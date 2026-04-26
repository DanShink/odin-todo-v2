import "./styles.css";
import state from "./state-logic";
import renderApp, { renderAddProject, renderAddTodo } from "./renderApp";
import {
	setupAddProjectsController,
	setupAddTodosController,
	setupDeleteTodosController,
	setupEditTodosController,
	setupProjectsController,
} from "./controllers";

renderApp(state);
renderAddProject();
renderAddTodo();
setupProjectsController();
setupAddProjectsController();
setupAddTodosController();
setupEditTodosController();
setupDeleteTodosController();
