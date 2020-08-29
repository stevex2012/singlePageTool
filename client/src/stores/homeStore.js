//首页数据管理

import { observable,action } from "mobx";
class HomeStore {
  @observable homeNum = 0;
  @action 
  add =()=> {
    console.log('add');
    this.homeNum++;
  }
  @action sub=()=> {
    this.homeNum--;
  }
}
export default HomeStore;