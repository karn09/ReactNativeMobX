/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './app/App';
import ListStore from './app/mobx/listStore';

import {
  AppRegistry,
  Navigator
} from 'react-native';

class ReactNativeMobX extends Component {
  // required: renders scene for given route. invoked with route and Navigator object.
  renderScene (route, Navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }
  // optional: config scene animations. invoked with route and routeStack param.
  // route corresponds to current scene being rendered by Navigator.
  // routeStack is the set of currently mounted routes that navigator can transition to.
  configureScene (route, routeStack) {
    if (route.type === 'Modal') {
      return Navigator.sceneConfigs.FloatFromBottom
    }
    return Navigator.sceneConfigs.PushFromRight
  }

  render () {
    return (
      <Navigator
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: App,
          passProps: {
            store: ListStore
          }
        }}
        />
    )
  }
});

AppRegistry.registerComponent('ReactNativeMobX', () => ReactNativeMobX);
