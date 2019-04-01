/**
 * @format
 */

import { AppRegistry } from "react-native";
// import App from "../src/components/App";
import { name as appName } from "./app.json";

import app from "./src/routes";

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => app);
