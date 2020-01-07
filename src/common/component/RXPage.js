import React,{ Component } from 'react';
import { 
  Text,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import PlatformUtil from '../utils/PlatformUtil';


class RXPage extends Component {
// export default class RXPage extends Component {
  constructor(props) {
    super(props);

    this.viewDidAppear = this.viewDidAppear.bind(this);
    this.viewDidDisappear = this.viewDidDisappear.bind(this);
  }

  //导航栏配置
  static navigationOptions = ({ navigation }) => {
    let nav = this.configNavigation(navigation);
    return nav;
  };

  get navigation() {
    return this.props.navigation;
  }

  get navParams() {
    return this.props.navigation.state.params || {};
  }

  UNSAFE_componentWillMount() {
    if (this.navigation) {
      this.appear = this.props.navigation.addListener('didFocus', this.viewDidAppear);
      this.disappear = this.props.navigation.addListener('didBlur', this.viewDidDisappear);
    }
    if (PlatformUtil.isAndroid()) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    this.appear && this.appear.remove(), this.appear = null;
    this.disappear && this.disappear.remove(), this.disappear = null;
    if (PlatformUtil.isAndroid()) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    this.navigation.goBack();
    return true
  }

  viewDidAppear() {
  }

  viewDidDisappear() {
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateRightPress: this.__navigateRightPress });
  }

  __navigateRightPress = (params=null) => {
    if(this.navigateRightPress) {
      this.navigateRightPress(params);
    }
    else if(__DEV__){
        let navigation = this.navigation || {};
        let state = navigation.state || {};
        routeName = state.routeName || 'routeName=empty-page';
        console.error('navigateRightPress() is not implemented on the current `'+routeName+'` page');
    }
  }
//  ----------------------------------------------------------
  /**
   * 目前使用的 react-navigation 默认的导航栏
   * 
   * https://reactnavigation.org/docs/zh-Hans/stack-navigator.html#navigationoptions-used-by-stacknavigator
   */  

  static configNavigation(navigation) {
    let title = this.navigationTitle();
    let backTitle = this.navigationBackTitle();
    let rightTitle = this.navigationRightTitle();
    var navMap = {};
    if(this._stringEnable(title)) {
      navMap['title'] = title;
    }
    // else {
    //   navMap['title'] = navigation.getParam('otherParam', 'title')
    // }

    if(this._stringEnable(backTitle)) {
      navMap['headerBackTitle'] =  backTitle+'';
    }

    if(rightTitle && React.isValidElement(rightTitle)) {
      navMap['headerRight'] = rightTitle;
    }else if(this._stringEnable(rightTitle)) {
      let rightView = <TouchableOpacity 
                        activeOpacity={0.5} 
                        onPress={()=>{
                          let navigateRightPress = navigation.state.params.navigateRightPress;
                          navigateRightPress && navigateRightPress();
                        }}
                      >
                        <Text style={{color: 'gray', fontSize: 15, paddingRight:15}}
                        >{rightTitle}</Text>
                      </TouchableOpacity>
      navMap['headerRight'] = rightView;
    }
    return navMap;
  }

  static _stringEnable(str) {
    if(!str) return false;
    if(typeof str === 'number') return true;
    if(typeof str !== 'string') return false;
    return true;
  }

  // static navigationTitle() {
  //   return null;
  // }

  // static navigationBackTitle() {
  //   return null;
  // }

  // static navigationRightTitle() {
  //   // 可以是组件 ， 也可以是 number / string
  //   return null;
  // }
//  ----------------------------------------------------------
}

module.exports = RXPage;