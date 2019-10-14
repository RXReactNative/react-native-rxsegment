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

import {
  RXSegment,
  RXSegmentTabBar
} from '../../../../package/rxsegment';

export default class RXxSegment extends Component {
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
    const { style, tabBarLabels, children } = this.props;
    return(
        <RXSegment
          style={[styles.container, style]}
          tabBarLabels={tabBarLabels}
          renderTabBar={()=>
            <RXSegmentTabBar 
              style={{ backgroundColor: 'red'}}
              tabBarLabels={tabBarLabels}
              underlineStyle={ {width: 25, height: 2} }
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