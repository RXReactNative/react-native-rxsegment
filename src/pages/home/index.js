import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import RXSegment from 'react-native-rxsegment';
import SegmentTab from '../../common/component/segment/SegmentIOS/SegmentTab';

export default class Home extends RXPage {
  constructor(props) {
    super(props);
  }

  //目前 web的没有写好 (No support for Web)
  static navigationOptions = ({ navigation }) => {
    if(Platform.OS != 'web')
    return this.configNavigation(navigation);
  }

  static navigationTitle() {
    return 'Segment';
  }

  static navigationBackTitle() {
    return '0-back';
  }

  static navigationRightTitle() {
    return 'diy';
  }

  navigateRightPress = () => {
    this.navigation.navigate('diy');
  }

  reload = () => {
    if(this.refTwo && this.refTwo.reload) {
      this.refTwo.reload();
    }
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'gary'}}>
        <RXSegment 
          tabBarStyle={{ backgroundColor: 'blue', paddingTop: 20}}
          tabBarLabels={['ios', 'android', 'web']}
        >
          <View style={styles.container}/>
        </RXSegment>

        <RXSegment
          style={styles.segmentHeader}
          tabBarStyle={{ backgroundColor: '#7D26CD', paddingTop: 20}}
          tabBarLabels={['ios', 'android', 'web', '']}
        >
          <View style={styles.container}/>
          <View style={styles.container}/>
        </RXSegment>


        <RXSegment
          style={styles.segmentHeader}
          renderTabBar={()=>
            <SegmentTab 
              tabBarLabels={['ios', 'android', 'web']}
            />
          }
        >
          <View style={styles.container}/>
          <View style={styles.container}/>
          <View style={styles.container}/>
        </RXSegment>


        <RXSegment
          style={styles.segmentHeader}
          renderTabBar={()=>
            <SegmentTab 
              tabBarLabels={['ios', 'android', 'web']}
              labelBorderRadius={0}
              middleLineEnable={true}
              // middenLineStyle={{width: 1}}
              style={{borderColor: '#A020F0'}}
              middleLineStyle={{backgroundColor: '#A020F0'}}
            />
          }
        >
          <View style={styles.container}/>
          <View style={styles.container}/>
          <View style={styles.container}/>
        </RXSegment>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  segmentHeader: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    height: 10,
  },
})