import "./styles.css";
import state from "./state-logic";
import renderApp from "./renderApp";
import { setupProjectsController } from "./controllers";

setupProjectsController();
renderApp(state);
