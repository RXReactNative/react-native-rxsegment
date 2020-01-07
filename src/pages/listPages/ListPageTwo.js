/**
 * 
 */
'use strict'
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
} from 'react-native';

import RXFlatList from '../../common/component/RXFlatList';

export default class ListPageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    }
  }

  componentDidMount() {
    console.log('load 2222');
    this.refreshData();
  }

  falseData = () => {
    let now = new Date();
    var array = [];
    for(let i=0; i<5; i++) {
      let txt = i+' '+now;
      array.push({txt});
    }
    return array;
  }

  refreshData = (pageNo, pageSize) => {
    let _that = this;
    return new Promise(function (resolve, reject) { 
      setTimeout(() => {
        let array = _that.falseData();
        let dataList = _that.state.dataList.concat(array);
        _that.setState({  dataList });
      }, 1000);
      resolve()
    });
  }

  renderItem = ({item, index}) => {
    let txt = item.txt || '';
    return<View style={styles.container}><Text>{txt}</Text></View>
  }

  reload = () => {
    let dataList = this.state.dataList.concat([{txt: 'srxboys'}]);
    this.setState({  dataList });
  }

  render() {
    const { style, navPush } = this.props;
    const { dataList } = this.state;
    return(
      <View style={[{flex: 1,backgroundColor: 'gary'}, style]}>
        <View style={{marginTop: 100, height: 40, backgroundColor: 'yellow'}}/>
        <Text>{'2222222222222'}</Text>
        <Button 
            title={'跳转 - 我的'}
            color={'blue'}
            onPress={()=>{
              if(navPush && typeof navPush === 'function') {
                navPush();
              }
              if(Platform.OS === 'web') {
                this.props.navigation.navigate('mine');
              }
            }}
          />
        <RXFlatList
          renderItem={this.renderItem}
          data={dataList}
          keyExtractor={(item, index) => index}
          onPullDown={this.refreshData}
          // onPullUp={this.refreshData}
          // itemSeparatorComponent={this.separator}
          // ListEmptyComponent={this.renderEmptyItem}
          pageSize={10}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});