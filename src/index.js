import "./styles.css";
import ficsitImage from "./images/ficsit.webp";
import state from "./state-logic";
import * as mutations from "./state-mutations";
import renderApp from "./renderApp";
import { setupProjectsController } from "./controllers";

console.log("Hello, World!");
setupProjectsController();
renderApp(state);
