import "./styles.css";
import state from "./state-logic";
import renderApp, { renderAddProject } from "./renderApp";
import {
	setupAddProjectsController,
	setupProjectsController,
} from "./controllers";

renderApp(state);
renderAddProject();
setupProjectsController();
setupAddProjectsController();
