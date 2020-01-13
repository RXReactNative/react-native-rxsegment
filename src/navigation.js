"use strict";
import React from 'react';
import Home from './pages/home/index';
import Diy from './pages/diy/index';

import {
  createAppContainer,
  createNavigationContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainStNavigatorackNav = createStackNavigator(
  {
    home: { screen: Home },
    diy: { screen: Diy },
  },
  {
    initialRouteName: 'home',
    // headerMode: 'none',
    mode: 'card',
    navigationOptions: () => ({
      gesturesEnabled: true,
    }),
    // transitionConfig: () => {
    //   return StackViewTransitionConfigs.SlideFromRightIOS;
    // },
  }
);

export default createAppContainer(MainStNavigatorackNav);