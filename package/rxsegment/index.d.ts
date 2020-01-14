/**
 * react-native-rxsegment
 * 
 * srxboys
 */
declare module 'react-native-rxsegment' {
  import { Component } from 'react'
  import {
    ViewStyle,
    StyleProp,
    ViewProps
  } from 'react-native'

  export class RXSegment extends Component<ViewProps> {
    /**
     * renderTabBar={()=>
     *     <RXSegmentTabBar 
     *        style={{ backgroundColor: 'red'}}
     *        tabBarLabels={tabBarLabels}
     *        underlineStyle={ {width: 25, height: 2} }
     *     />
     * }
     */
    renderTabBar?: () => React.ReactElement | null;

    /**
     * this is an Array<{string|number}> 
     */
    tabBarLabels?: any;
  }




  

  export class RXSegmentTabBar extends Component<ViewProps> {
    
    tabBarStyle?: StyleProp<ViewStyle>;

    underlineStyle?: StyleProp<ViewStyle>;

    /**
     * this is an Array<{string|number}> 
     */
    tabBarLabels?: any;

    labelStyle?: StyleProp<ViewStyle>;

    activeTextColor?: string;

    inactiveTextColor?: string;

    selectIndex?: number;

    onPress?: ()=>{};

    //diy
    renderMiddenLine(index: number): Component;
    renderLabel(title: string,index: number): Component;
  }
  
}