import { AppRegistry } from 'react-native';
import App from './web/src/App'

import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("react-root")
});
