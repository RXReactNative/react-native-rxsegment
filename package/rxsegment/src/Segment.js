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
  View,
  Keyboard,
} from 'react-native';

import SegmentTabBar from './SegmentTabBar';
import PropTypes from 'prop-types';

class Segment extends Component {
  static propTypes = {
    ...View.propTypes,
    renderTabBar: PropTypes.func,
    tabBarLabels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ])),
    tabBarStyle: PropTypes.any,
  }

  static defaultProps = {
    ...View.defaultProps,
    renderTabBar: null,
    tabBarLabels: [],
    tabBarStyle: {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectIndex: 0,
      contents: [],
    }
    this.contentsCache = [],
    this.childrenViews = [];
  }

  componentDidMount() {
    this.configDefaultContent(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { children } = nextProps;
    children = children || [];
    let currentChildren = this.childrenViews || {};
    if(children != currentChildren) {
      this.configDefaultContent(nextProps);
    }
  }

  configDefaultContent(props) {
    this.childrenViews = this.buildChildren(props);
    let length = this.childrenViews.length;
    var contents = [];
    let selectIndex = this.state.selectIndex;

    let contentsCache = this.contentsCache;
    let cacheLength = contentsCache.length;

    if(selectIndex>=length) selectIndex=0;
    for(let i=0; i < length; i++) {
      let cacheItem = contentsCache[i];

      if(i !== selectIndex){
        var view = null;
        if(cacheItem && i <= cacheLength) {
          if(cacheItem.key) {
            view = this.changeViewToHidden(this.childrenViews[i], i, length);
          }
        }        
        contents.push(view)
      } 
      else {
        let view = this.changeViewToShow(this.childrenViews[i], i, length);
        contents.push(view)
      }
    }
    this.setState({contents, selectIndex});
  }

  buildChildren(props) {
    let { children } = props;

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
    Keyboard.dismiss();
    let { contents, selectIndex } = this.state;
    let length = contents.length || 0;
    if(index >= length) return;
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
      let cacheItem = this.contentsCache[index];
      if(!cacheItem || !cacheItem.key) {
        this.contentsCache[index]=view;
      }
    }
    contents[index] = view;

    this.setState({ contents, selectIndex:index })
  }

  renderTabBarView = () => {
    const { renderTabBar, tabBarLabels, tabBarStyle } = this.props;
    const { selectIndex } = this.state;
    if(renderTabBar && typeof renderTabBar === 'function') {
      let view = renderTabBar();
      return React.cloneElement(view,{
        selectIndex,
        onPress: (index)=>this.changeSelect( index ),
      });
    }
    else {
      return (
        <SegmentTabBar
          style={ [{backgroundColor: 'blue'}, tabBarStyle] }
          tabBarLabels={tabBarLabels}
          selectIndex={selectIndex}
          underlineStyle={ {width: 25, height: 2} }
          onPress={(index)=>{this.changeSelect( index )}}
        />
      )
    }
  }

  renderChilder = () => {
    const { contents } = this.state;
    return(
      <View style={{flex: 1}}>
        {contents}
      </View>
    )
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
  viewShow: {
    flex: 1,
  },
  viewHidden: {
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden',
  }
})