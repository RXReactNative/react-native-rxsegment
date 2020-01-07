"use strict";
import React from 'react';
import Home from './pages/home/index';
import Mine from './pages/mine/index';

import {
  createAppContainer,
  createNavigationContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainStNavigatorackNav = createStackNavigator(
  {
    home: { screen: Home },
    mine: { screen: Mine },
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