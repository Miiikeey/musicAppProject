/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Main from './src/Main';
import Login from './src/componants/login';
import SideMenu from './src/componants/sideMenu';
import Search from './src/componants/search';
import Profile from './src/componants/profile';

AppRegistry.registerComponent(appName, () => Profile);
