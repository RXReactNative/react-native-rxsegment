'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';

import RXRefreshHeader from './RXRefreshHeader';

export default class RXFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      refreshing: false,
      noMoreData: false,
    }
  }

  static propTypes = {
    ...FlatList.propTypes,
    pageSize: PropTypes.number,
    didMountRefresh: PropTypes.bool,
    onPullDown: PropTypes.func,//返回promise
    onPullUp: PropTypes.func,//返回promise,then返回是否没有更多数据
    emptyImage: PropTypes.any,
    emptyTitle: PropTypes.string,
    itemSeparatorComponent: PropTypes.func,
  }

  static defaultProps = {
    didMountRefresh: true,
    pageSize: 10,
  }

  componentDidMount() {
    if (this.props.didMountRefresh && this.props.onPullDown) {
      this._pullDownRefresh();
    }
  }

  _pullDownRefresh = () => {
    if (!this.props.onPullDown) return;
    if (!this.state.refreshing) {
      this.setState({
        pageNo: 1,
        refreshing: true,
        webRefreshing: true,
      }, () => {
        this.props.onPullDown(this.state.pageNo, this.props.pageSize)
          .then((e) => {
            this.setState({
              refreshing: false,
              noMoreData: false,
              webRefreshing: false,
            })
          })
          .catch((e) => {
            this.setState({
              refreshing: false,
              noMoreData: false,
              webRefreshing: false,
            })
          });
      })
    } else {
      this.setState({
        refreshing: false,
        webRefreshing: false,
      })
    }
  }

  _pullUpRefresh = () => {
    if (!this.props.onPullUp) return
    if (!this.state.refreshing && !this.state.noMoreData) {
      const pageNo = this.state.pageNo + 1;
      this.setState({
        pageNo: pageNo,
        refreshing: true,
      }, () => {
        this.props.onPullUp(this.state.pageNo, this.props.pageSize)
          .then((noMoreData) => {
            this.setState({
              noMoreData: noMoreData,
              refreshing: false,
            })
          }).catch((e) => {
            this.setState({
              refreshing: false,
              noMoreData: false,
            })
          });
      })
    } else {
      this.setState({
        refreshing: false,
      })
    }
  }

  _refreshControl = () => {
    if (this.props.onPullDown) {
      if(Platform.OS === 'web') {
        return null;
      }
      return (
        <RefreshControl 
            // colors={['red']}   //Android 指示器颜色
            // tintColor={'blue'} //iOS 指示器颜色
            refreshing={this.state.refreshing}
            onRefresh={this._pullDownRefresh}
        />
      )
    }
  }

  render() {
    const { webRefreshing } = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        <RXRefreshHeader 
          style={{marginBottom: 10}}
          refreshing={webRefreshing}
          onPress={()=>{
            if(this.refFlatList && this.refFlatList.scrollToOffset) {
              this.refFlatList.scrollToOffset({animated: true, offset: 0});
            }
            this._pullDownRefresh();
          }}
        />
        <FlatList {...this.props}
          ref={(e)=> {this.refFlatList = e}}
          refreshControl={this._refreshControl()}
          onEndReachedThreshold={0.2}
          onEndReached={this._pullUpRefresh} 
          ItemSeparatorComponent={this.props.itemSeparatorComponent}
        />
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
