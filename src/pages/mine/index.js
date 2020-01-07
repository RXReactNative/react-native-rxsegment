import React,{ Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import RXSegment from '../home/component/RXSegment';
import ListPageOne from '../listPages/ListPageOne';
import ListPageTwo from '../listPages/ListPageTwo';

export default class Mine extends RXPage {
  constructor(props) {
    super(props);
  }

  //目前 web的没有写好
  static navigationOptions = ({ navigation }) => {
    if(Platform.OS != 'web')
    return this.configNavigation(navigation);
  }

  static navigationTitle() {
    return '我的';
  }

  static navigationBackTitle() {
    return '试试返回';
  }

  static navigationRightTitle() {
    return '测试-2';
  }


  navigateRightPress = () => {
    alert('我的 - 导航栏 right onPress');
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{marginBottom: 10}}>{'分段开始 mine'}</Text>
        <RXSegment tabBarLabels={['ios', 'android']}>
          <ListPageOne navigation={this.navigation}/>
          <ListPageTwo navigation={this.navigation}/>
        </RXSegment>
      </View>
    )
  }
}