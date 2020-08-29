// 合并多个stroe

import HomeStore from './homeStore';
import CreateStore from './createStore';
import ViewStore from './viewStore';
const homeStore = new HomeStore();
const createStore = new CreateStore();
const viewStore = new ViewStore();


const stores = {
    createStore,
    homeStore,
    viewStore
}

export default stores;