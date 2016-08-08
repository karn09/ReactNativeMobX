import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHightlight, Stylesheet } from 'react-native';
import { observer } from 'mobx-react/native';
import NewItem from './NewItem'

// mobx: turn component into a reactive component. wraps TodoList render in a
// mobx.autorun function. this makes sure that any data used during rendering is
// forced to re-render upon change.
@observer
// Component is a base class for React Components when defined by ES6.
// similar to React.createClass with exception of getInitialState.
class TodoList extends Component {
  constructor () {
    super() // allows calling of functions on parent
    // instead of getInitialState, assign values to this.state = {}.
    // this will be initial state of component.
    this.state = {
      text: '',
      showInput: false
    }
  }

  toggleInput () {
    // setState: primary way of triggering ui update.
    // will contain keys to update, or function returning keys to update.
    this.setState({ showInput: !this.state.showInput })
  }

  addListItem () {
    // store is inherited from passProps object with ListStore constructor
    this.props.store.addListItem(this.state.text)
    this.setState({
      text: '',
      showInput: !this.state.showInput
    })
  }

  removeListItem (item) {
    this.props.store.removeListItem(item)
  }

  updateText (text) {
    this.setState({text})
  }

  addItemToList (item) {
    // TODO: description of what navigator is doing..
    this.props.navigator.push({
      component: NewItem,
      type: 'Modal',
      passProps: {
        item: '',
        store: this.props.store
      }
    })
  }


}
