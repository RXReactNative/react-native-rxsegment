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

class SegmentTabBar extends Component {
  static propTypes = {
    ...View.propTypes,
    tabBarStyle: PropTypes.any,
    underlineStyle: PropTypes.any,
    tabBarLabels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ])),
    labelStyle: PropTypes.any,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    onPress: PropTypes.func,
    selectIndex: PropTypes.number,
  }

  static defaultProps = {
    ...View.defaultProps,
    tabBarStyle: {},
    underlineStyle: {},
    tabBarLabels: [],
    labelStyle: {},
    activeTextColor: '#FFF',
    inactiveTextColor: 'rgba(255, 255, 255, 0.8)',
    onPress: (index)=>{},
    selectIndex: 0,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      lineLocal: {},
    }
    this.labelMeasures = [];
  }

  renderMiddenLine(index=0) {
    return null;
  }

  renderLabel(title='', index) {
    const { tabBarStyle, labelStyle, selectIndex, activeTextColor, inactiveTextColor, onPress } = this.props;
    let fontWeight = index === selectIndex?{fontWeight: "bold", color: activeTextColor}:{ color: inactiveTextColor}
    return (
      <TouchableOpacity
        key={'tabBar-label-'+index}
        style={[styles.labelContent, tabBarStyle]}
        activeOpacity={index != selectIndex?0.7:1}
        onPress={()=>{ 
          if(index != selectIndex) {
            onPress && onPress(index) 
          }
        }}
      >
        <Text style={[styles.label, labelStyle, fontWeight]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderTabBarLabel = () => {
    const { tabBarLabels  } = this.props;
    if(!(Array.isArray(tabBarLabels) && tabBarLabels.length)) {
      return null;
    }
    let length = tabBarLabels.length;
    
    let labelViews = [];
    for(let i=0; i<length; i++) {
      let label = tabBarLabels[i] || '';
      if(React.isValidElement(label)) {
        labelViews.push(label)
      }
      else if(typeof label === 'string' || typeof label === 'number') {
        let itemView = this.renderLabel(label, i);
        labelViews.push(itemView);
      }
      else {
        let itemView = this.renderLabel('', i);
        labelViews.push(itemView);
      }
      if(i + 1 < length) {
        labelViews.push(this.renderMiddenLine(i));
      }
    }
    return labelViews;
  }

  render() {
    let { style, underlineStyle, selectIndex, tabBarLabels } = this.props;

    tabBarLabels = tabBarLabels || [];
    var lineWidth = {};
    let marginLeft = {};
    if(Array.isArray(tabBarLabels)) {
      let row = (1/(tabBarLabels.length*1.0)) * 100;
      lineWidth = {width: row+'%'};

      if(selectIndex < tabBarLabels.length) {
        let left = selectIndex * row;      
        if(left === 1) {
          left = 100;
        }
        marginLeft = {marginLeft:  left+'%'}
      }
    }

    return(
      <View style={[styles.container, style]}>
        <View style={{flexDirection: 'row'}}>
          {this.renderTabBarLabel()}
        </View>
        <View style={[styles.lineContent, marginLeft, lineWidth]}>
          <View style={[styles.line, {width: '80%'}, underlineStyle]} />
        </View>
      </View>
    )
  }

}

module.exports = SegmentTabBar;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  labelContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
  },
  lineContent: {
    marginTop: 5,
    alignItems: 'center',
    minHeight: 1,
    marginBottom: 2,
  },
  line: {
    backgroundColor: '#FFF',
    minHeight: 1,
  },
})