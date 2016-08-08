import {observable} from 'mobx'

let index = 0

class ObservableListStore {
  @observable list = [] // create an observable array decorator - mobX API

  addListItem (item) { // extend ObservableListStore.addListItem(item)
    this.list.push({
      name: item,
      items: [],
      index
    });
    index++
  }

  removeListItem (item) {
    this.list = this.list.filter( (l) => {
      return l.index !== item.index;
    })
  }

  addItem (item, name) {
    this.list.forEach( (l) => {
      if (item.index === l.index) {
        l.items.push(name);
      }
    })
  }

}

const observableListStore = new ObservableListStore()
export default observableListStore // export instantiated ObservableListStore.
