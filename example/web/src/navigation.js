"use strict";
import { createAppContainer, StackViewTransitionConfigs } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthSucc from './pages/AuthSucc';

import Home from '../../js/pages/home/index';
import Mine from '../../js/pages/mine/index';

export const PageContent = {
  pageName : "pageName",   //后台定义的参数
  messageKey : "message",   //后台定义的参数
  paramValue : { //允许后台可以进入的页面有哪些？？
      home: 'home',    //后台定义参数的值 : 项目中Navigator中的页面
      mine: 'mine',
      authSucc: 'authSucc',
  }
}

var pageName = PageContent.pageName;
var params = new URLSearchParams(document.location.search);
var pageNameValue = "home";

if (params.has(pageName)) {
  //我的首页
  pageNameValue = params.get(pageName);
}

export var Navigation_routers = [];

const Navigator = createStackNavigator(
  {
    authSucc: { screen: AuthSucc},

    home: { screen: Home },
    mine: { screen: Mine },
  },
  {

    initialRouteName: PageContent.paramValue[pageNameValue],
    headerMode: "none",
    mode: "card",
    navigationOptions: ({ navigation }) => {
      Navigation_routers.push(navigation.state)
    },

  }
);

export default createAppContainer(Navigator);
