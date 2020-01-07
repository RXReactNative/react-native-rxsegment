import React,{ Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import RXSegment from './component/RXSegment';
import ListPageOne from '../listPages/ListPageOne';
import ListPageTwo from '../listPages/ListPageTwo';

export default class Home extends RXPage {
  constructor(props) {
    super(props);
  }

  //目前 web的没有写好
  static navigationOptions = ({ navigation }) => {
    if(Platform.OS != 'web')
    return this.configNavigation(navigation);
  }

  static navigationTitle() {
    return '首页';
  }

  static navigationBackTitle() {
    return '试试返回';
  }

  static navigationRightTitle() {
    return '我的';
  }

  navigateRightPress = () => {
    this.navigation.navigate('mine');
  }

  reload = () => {
    if(this.refTwo && this.refTwo.reload) {
      this.refTwo.reload();
    }
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'gary'}}>
        <Text style={{marginBottom: 10}}>{'分段开始'}</Text>
        <RXSegment tabBarLabels={['ios', 'android']}>
          <ListPageOne navigation={this.navigation}/>
          <ListPageTwo ref={(e)=>this.refTwo=e} navigation={this.navigation} navPush={this.reload}/>
        </RXSegment>
      </View>
    )
  }
}