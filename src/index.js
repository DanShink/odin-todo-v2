import "./styles.css";
import state from "./state-logic";
import renderApp, { renderAddProject } from "./renderApp";
import {
	setupAddProjectsController,
	setupEditTodosController,
	setupProjectsController,
} from "./controllers";

renderApp(state);
renderAddProject();
setupProjectsController();
setupAddProjectsController();
setupEditTodosController();
