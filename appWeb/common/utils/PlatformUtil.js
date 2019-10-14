import { Platform } from "react-native";

const PlatformUtil = {
    isWeb: () => {
      return Platform.OS === 'web'
    },

    isAndroid: () => {
      if (PlatformUtil.isWeb()){
        var u = window.navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return !isIOS;
      } else {
        return Platform.OS === 'android'
      }    
    },

    isIOS: () => {
      if (PlatformUtil.isWeb()){
        var u = window.navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      } else {
        return Platform.OS === 'ios'
      }        
    }

}

export default PlatformUtil;
