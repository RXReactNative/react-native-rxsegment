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
  View,
} from 'react-native';

import PropTypes from 'prop-types';

import RXSegment from 'react-native-rxsegment';
import SegmentTab from './SegmentTab';

export default class SegmentIOS extends Component {
  static propTypes = {
    ...View.propTypes,
    tabBarLabels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ])),
  }

  static defaultProps = {
    ...View.defaultProps,
    tabBarLabels: []
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { style, tabBarLabels, children, ...other } = this.props;
    return(
        <RXSegment
          style={[styles.container, style]}
          tabBarLabels={tabBarLabels}
          renderTabBar={()=>
            <SegmentTab 
              tabBarLabels={tabBarLabels}
              // labelBorderRadius={0}
              // middenLineEnable={true}
              // middenLineStyle={{width: 5}}
              {...other}
            />
          }
        >
          {children}
        </RXSegment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})