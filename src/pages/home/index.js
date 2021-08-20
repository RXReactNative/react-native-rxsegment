import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

import RXPage from '../../common/component/RXPage';

import RXSegment, { RXSegmentTabBar } from 'react-native-rxsegment';
import SegmentTab from '../../common/component/segment/SegmentIOS/SegmentTab';

export default class Home extends RXPage {
  constructor(props) {
    super(props);
  }

  //目前 web的没有写好 (No support for Web)
  static navigationOptions = ({ navigation }) => {
    if (Platform.OS != 'web')
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
    if (this.refTwo && this.refTwo.reload) {
      this.refTwo.reload();
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'gary' }}>
        <RXSegment
          tabBarStyle={{ backgroundColor: 'blue', paddingTop: 20 }}
          tabBarLabels={['ios', 'android', 'web']}
        >
          <View style={styles.container}>3, 仅有一个子元素</View>
        </RXSegment>

        <RXSegment
          style={styles.segmentHeader}
          renderTabBar={() =>
            <RXSegmentTabBar
              style={{ backgroundColor: '#7D26CD', paddingTop: 20 }}
              tabBarLabels={['ios', 'android', 'web', '']}
              activeTextColor={'red'}
              underlineStyle={{ width: 50, height: 3, backgroundColor: 'red' }}
            />
          }
        >
          <View style={styles.container}>4仅2, 第1个元素</View>
          <View style={styles.container}>4仅2, 第2个元素</View>
        </RXSegment>


        <RXSegment
          style={styles.segmentHeader}
          renderTabBar={() =>
            <SegmentTab
              tabBarLabels={['ios', 'android', 'web']}
            />
          }
        >
          <View style={styles.container}>第 ① 个元素</View>
          <View style={styles.container}>第 ② 个元素</View>
          <View style={styles.container}>第 ③ 个元素</View>
        </RXSegment>


        <RXSegment
          style={styles.segmentHeader}
          renderTabBar={() =>
            <SegmentTab
              tabBarLabels={['ios', 'android', 'web']}
              labelBorderRadius={0}
              middleLineEnable={true}
              // middenLineStyle={{width: 1}}
              style={{ borderColor: '#A020F0' }}
              middleLineStyle={{ backgroundColor: '#A020F0' }}
            />
          }
        >
          <View style={styles.container}>第 ① 个元素</View>
          <View style={styles.container}>第 ② 个元素</View>
          <View style={styles.container}>第 ③ 个元素</View>
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