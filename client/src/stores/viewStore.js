//首页数据管理

import { observable,action } from "mobx";
class ViewStore {
  html_json = {
    pc:[],
    h5:[]
  }
  @observable html_json;
  @action 
  setHtmlJson =(data)=> {
    this.html_json = data
  }
}
export default ViewStore;