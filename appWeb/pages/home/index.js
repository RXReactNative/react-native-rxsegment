import React,{ Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import RXSegment from './component/RXSegment';
import ListPageOne from '../listPages/ListPageOne';
import ListPageTwo from '../listPages/ListPageTwo';

export default class Home extends RXPage {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return this.configNavigation(navigation);
  }

  static navigationTitle() {
    return '首页';
  }

  static navigationBackTitle() {
    return '试试返回';
  }

  static navigationRightTitle() {
    return '测试';
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'gary'}}>
        <Text style={{marginBottom: 10}}>{'分段开始'}</Text>
        <RXSegment tabBarLabels={['ios', 'android']}>
          <ListPageOne navigation={this.navigation}/>
          <ListPageTwo navigation={this.navigation}/>
        </RXSegment>
      </View>
    )
  }
}