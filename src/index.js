import "./styles.css";
import ficsitImage from "./images/ficsit.webp";
import getAppState from "./state-logic";

console.log("Hello, World!");
const image = document.createElement("img");
image.src = ficsitImage;
document.body.appendChild(image);
const state = getAppState();
state.printState();
