/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
import CommonColor from '../styles/CommonColor';

export default class RXRefreshHeader extends Component {
  static propTypes = {
    ...View.propTypes,
    hidden: PropTypes.bool,
    refreshing: PropTypes.bool,
    appHeader: PropTypes.element,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    ...View.defaultProps,
    hidden: false,
    refreshing: false,
    appHeader: null,
    onPress: () => { },
  }

  constructor(props) {
    super(props);
  }

  renderWeb() {
    const { refreshing, style, onPress } = this.props;
    if (refreshing) {
      return (
        <View style={[styles.container, style]}>
          <ActivityIndicator animating={true} />
          {/* <RefreshControl refreshing={true} onRefresh={()=>{}}/> */}
        </View>
      )
    }

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => onPress && onPress()}>
        <Text style={styles.textPre}>点击<Text style={styles.textSuf}>刷新获取最新数据</Text></Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { hidden, appHeader } = this.props;
    if (hidden) return null;

    if (Platform.OS === 'web') {
      return this.renderWeb();
    }

    return appHeader;
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPre: {
    fontSize: 12,
    color: CommonColor.BtnBlue,
  },
  textSuf: {
    color: '#999999',
  },
});