import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
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
    // this.props.navigator is holding the current view state for the TodoList
    // by pushing a new item, it will render the specified item with the passed
    // properties.
    this.props.navigator.push({
      component: NewItem,
      type: 'Modal',
      passProps: {
        item,
        store: this.props.store
      }
    })
  }

  render() {
    // below is called object destructuring.
    // this.state = { showInput: true };
    // const { showInput } = this.state;
    // console.log(showInput) => true;

    const { showInput } = this.state;
    const { list } = this.props.store;

    return (
      <View style={{ flex:1 }}>
        <View style={ styles.heading }>
          <Text style={ styles.headingText }>
            My List App
          </Text>
        </View>
        {!list.length ? <NoList /> : null}
        <View style={{ flex:1 }}>
          {list.map((l, i) => {
            return <View key={i} style={styles.itemContainer}>

              <Text
                style={styles.item}
                onPress={this.addItemToList.bind(this, l)}>
                {l.name.toUpperCase()}
              </Text>

              <Text
                style={styles.deleteItem}
                onPress={this.removeListItem.bind(this, l)}>
                Remove
              </Text>

            </View>
          })}

        </View>

        <TouchableHighlight
          underlayColor='transparent'
          onPress={
            this.state.text === '' ? this.toggleInput.bind(this)
            : this.addListItem.bind(this, this.state.text)
          }
          style={styles.button}
          >
          <Text
            style={styles.buttonText}>
            {this.state.text === '' && '+ New List'}
            {this.state.text !== '' && '+ Add New List Item'}
          </Text>
        </TouchableHighlight>
        {showInput && <TextInput
          style={styles.input}
          onChangeText={(text) => this.updateText(text)} />}
      </View>
    );
  }
}

const NoList = () => (
  <View style={styles.noList}>
    <Text style={styles.noListText}>No List, Add List To Get Started</Text>
  </View>
)
const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    flexDirection: 'row'
  },
  item: {
    color: '#156e9a',
    fontSize: 18,
    flex: 3,
    padding: 20
  },
  deleteItem: {
    flex: 1,
    padding: 20,
    color: '#a3a3a3',
    fontWeight: 'bold',
    marginTop: 3
  },
  button: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#156e9a'
  },
  buttonText: {
    color: '#156e9a',
    fontWeight: 'bold'
  },
  heading: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#156e9a'
  },
  headingText: {
    color: '#156e9a',
    fontWeight: 'bold'
  },
  input: {
    height: 70,
    backgroundColor: '#f2f2f2',
    padding: 20,
    color: '#156e9a'
  },
  noList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noListText: {
    fontSize: 22,
    color: '#156e9a'
  },
})

export default TodoList
