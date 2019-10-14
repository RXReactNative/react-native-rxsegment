"use strict";
import React, { Component } from 'react';
import Home from '../appWeb/pages/home/index';

import {
  createAppContainer,
  createNavigationContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainStNavigatorackNav = createStackNavigator(
  {
    home: { screen: Home },
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