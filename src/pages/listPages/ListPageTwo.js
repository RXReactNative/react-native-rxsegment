/**
 * 
 */
'use strict'
import React,{ Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class ListPageTwo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('load 2222');
  }

  render() {
    const { style } = this.props;
    return(
      <View style={[{flex: 1,backgroundColor: 'gary'}, style]}>
        <View style={{marginTop: 100, height: 40, backgroundColor: 'yellow'}}/>
        <Text>{'2222222222222'}</Text>
        <View style={{flex: 1, marginTop: 100, backgroundColor: 'yellow'}}/>
      </View>
    )
  }
}