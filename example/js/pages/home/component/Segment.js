/**
 * 
 * @this Segment
 * 
 * @flow
 * ------------------------
 * 
 */

'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
} from 'react-native';

import SegmentTabBar from './SegmentTabBar';
import PropTypes from 'prop-types';

class Segment extends Component {
  static propTypes = {
    ...View.propTypes,
    scrollStyle: PropTypes.any,
    renderTabBar: PropTypes.func,
    tabBarLabels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ])),
    wxBrowser: PropTypes.bool,
  }

  static defaultProps = {
    ...View.defaultProps,
    scrollStyle: {},
    renderTabBar: null,
    tabBarLabels: [],
    wxBrowser: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectIndex: 0,
      contents: [],
      contentsCache: [],
    }
    this.childrenViews = [];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { children } = nextProps;
    let currentChildren = this.childrenViews || {};
    let currentLength = currentChildren.length || 0;
    let length = children.length || 0;
    if(length != currentLength) {
      this.configDefaultContent();
    }
  }

  configDefaultContent() {
    this.childrenViews = this.buildChildren();
    let length = this.childrenViews.length;
    var contents = [];
    let selectIndex = 0;
    for(let i=0; i < length; i++) {
      if(i > 0){
        let empty = null;
        contents.push( empty );
      } 
      else {
        let view = this.changeViewToShow(this.childrenViews[0], 0, length);
        contents.push(view)
      }
    }
    this.setState({contents, selectIndex})
  }

  buildChildren() {
    let { children } = this.props;

    if (!children) {
      children = [];
    } else if (!(children instanceof Array)) {
      children = [children];
    }
    return children;
  }

  changeViewToHidden(view, index=0, zIndex) {
    return React.cloneElement(view, {
      key: 'rx-segment-item-'+index,
      style: [styles.viewHidden, {zIndex}],
    });
  }

  changeViewToShow(view, index=0, zIndex=1000) {
    return React.cloneElement(view,{
      key: 'rx-segment-item-'+index,
      style: [styles.viewShow, {zIndex}],
    });
  }

  changeSelect = (index) => {
    let { contents, selectIndex } = this.state;
    if(index>=contents.length) return;
    let length = contents.length;
    if(index != selectIndex) {
      var lastView = contents[selectIndex];
      if(React.isValidElement(lastView)) {
        lastView = this.changeViewToHidden(lastView, selectIndex, selectIndex);
        contents[selectIndex] = lastView;
      }
    }
    var view = contents[index];
    if(!view || !React.isValidElement(view)) {
      view = this.childrenViews[index];
    }
    if(React.isValidElement(view)) {
      view = this.changeViewToShow(view, index, length+index);
    }
    contents[index] = view;

    this.setState({ contents, selectIndex:index })
  }

  renderTabBarView = () => {
    const { renderTabBar, tabBarLabels } = this.props;
    const { selectIndex } = this.state;
    if(renderTabBar) {
      let view = renderTabBar();
      return React.cloneElement(view,{
        selectIndex,
        onPress: (index)=>this.changeSelect( index ),
      });
    }
    else {
      return (
        <SegmentTabBar
          style={{ backgroundColor: 'white'}}
          tabBarLabels={tabBarLabels}
          selectIndex={selectIndex}
          underlineStyle={ {width: 25, height: 2} }
          onPress={(index)=>{this.changeSelect( index )}}
        />
      )
    }
  }

  renderChilder = () => {
    const { wxBrowser } = this.props;
    const { contents } = this.state;
    if(wxBrowser && Platform.OS === 'web') { //微信公众账号、小程序
      return (
        <ScrollView style={{flex: 1}}>
          {contents}
        </ScrollView>
      )
    }
    else {
      return(
        <View style={{flex: 1}}>
          {contents}
        </View>
      )
    }
  }

  render(){
    const { style, renderTabBar, children, ...other } = this.props;
    return(
      <View style={[styles.container, style]}>
        {this.renderTabBarView()}
        {this.renderChilder()}
      </View>
    )
  }

}

module.exports = Segment;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  scrollStyle: {
    flex: 1,
  },
  viewShow: {
    ...StyleSheet.absoluteFill,
    overflow: 'scroll',
  },
  viewHidden: {
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden',
  }
})
