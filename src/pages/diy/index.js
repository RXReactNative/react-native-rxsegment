import React,{ Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import SegmentIOS from '../../common/component/segment/SegmentIOS/SegmentIOS';
import ListPageOne from '../listPages/ListPageOne';
import ListPageTwo from '../listPages/ListPageTwo';

export default class Mine extends RXPage {
  constructor(props) {
    super(props);
  }

  //目前 web的没有写好 (No support for Web)
  static navigationOptions = ({ navigation }) => {
    if(Platform.OS != 'web')
    return this.configNavigation(navigation);
  }

  static navigationTitle() {
    return 'diy segment && tabBar';
  }

  static navigationBackTitle() {
    return '1-back';
  }

  static navigationRightTitle() {
    return 'right';
  }


  navigateRightPress = () => {
    alert('right onPress');
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{marginBottom: 10}}>{'diy segment'}</Text>
        <SegmentIOS tabBarLabels={['ios', 'android', 'web']}>
          <ListPageOne navigation={this.navigation}/>
          <ListPageTwo navigation={this.navigation}/>
        </SegmentIOS>
      </View>
    )
  }
}