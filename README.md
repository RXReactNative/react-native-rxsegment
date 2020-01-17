
# react-native-rxsegment ： 分段控制器组件、选项卡视图组件

Support iOS/Android/web

## Getting started
`$ npm install react-native-rxsegment --save`


`演示 web` / `show web`
https://rxreactnative.github.io/react-native-rxsegment/

<br />

![srxboys](https://github.com/RXReactNative/react-native-rxsegment/blob/master/screen_img/segment.png)

```js
//default
      <RXSegment 
        tabBarStyle={{ backgroundColor: 'blue', paddingTop: 20}}
        tabBarLabels={['ios', 'android', 'web']}
      >
        <View style={styles.container}/>
      </RXSegment>

//diy
      <RXSegment
          style={styles.segmentHeader}
          renderTabBar={()=>
            <RXSegmentTabBar
              style={{ backgroundColor: '#7D26CD', paddingTop: 20}}
              tabBarLabels={['ios', 'android', 'web', '']}
              activeTextColor={'red'}
              underlineStyle={ {width: 50, height: 3, backgroundColor: 'red'} }
            />
          }
        >
          <View style={styles.container}/>
          <View style={styles.container}/>
        </RXSegment>
```
