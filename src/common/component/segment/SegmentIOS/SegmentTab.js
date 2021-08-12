/**
 *
 * @this
 *
 * @flow
 */

'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import { RXSegmentTabBar } from 'react-native-rxsegment';

export default class SegmentTab extends RXSegmentTabBar {
  static propTypes = {
    ...RXSegmentTabBar.propTypes,
    borderRadius: PropTypes.number,
    labelBorderRadius: PropTypes.number,
    middleLineEnable: PropTypes.bool,
  }
  static defaultProps = {
    ...RXSegmentTabBar.defaultProps,
    borderRadius: 8,
    labelBorderRadius: 8,
    activeTextColor: '#000',
    inactiveTextColor: '#000',
    middleLineEnable: false,
    middleLineStyle: {},
  }

  constructor(props, context) {
    super(props, context);
  }

  renderMiddenLine(index = 0) {
    const { middleLineEnable, middleLineStyle } = this.props;
    if (!middleLineEnable) return null;
    return <View style={[{ width: 1, backgroundColor: 'blue' }, middleLineStyle]} key={'s-m-l-' + index} />
  }

  renderLabel(title = '', index) {
    const { labelBorderRadius, tabBarStyle, labelStyle, selectIndex, activeTextColor, inactiveTextColor, onPress } = this.props;
    let fontWeight = index === selectIndex ? { fontWeight: "bold", color: activeTextColor } : { color: inactiveTextColor }
    let bgStyle = index === selectIndex ? { backgroundColor: '#DEDEDE' } : { backgroundColor: 'white' }
    return (
      <TouchableOpacity
        key={'tabBar-label-' + index}
        style={[styles.labelContent, { borderRadius: labelBorderRadius }, bgStyle, tabBarStyle]}
        activeOpacity={index != selectIndex ? 0.7 : 1}
        onPress={() => {
          if (index != selectIndex) {
            onPress && onPress(index)
          }
        }}
      >
        <Text style={[styles.label, labelStyle, fontWeight]}>{title}</Text>
      </TouchableOpacity>
    )
  }


  render() {
    const { style, borderRadius } = this.props;
    return (
      <View style={[styles.container, { borderRadius }, style]}>
        {this.renderTabBarLabel()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    height: 30,
    borderWidth: 1,
    borderColor: 'blue',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  labelContent: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
  },
})