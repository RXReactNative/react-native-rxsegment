/**
 * 
 */
'use strict'
import React,{ Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

export default class ListPageOne extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('load 11111');
  }

  render() {
    const { style } = this.props;
    return(
      <ScrollView style={style}>
        <View style={{flex: 1,backgroundColor: 'gary'}}>
          <View style={{flex: 1, marginTop: 100, height: 40, backgroundColor: 'blue'}}/>
          <Text>{'1111111111'}</Text>
          <View style={{flex: 1, marginTop: 100, height: 400, backgroundColor: 'blue'}}/>
        </View>
      </ScrollView>
    )
  }
}