//编辑构建页面数据
import { observable, action } from "mobx";
//pc page floor list
let pcFloorList = observable([]);
// h5 page floor list
let h5FloorList = observable([]);
class CreateStore {
  //构建pc/h5
  pcFlag = 'pc';
  h5Flag = 'h5';
  //页面状态 pc/h5
  @observable pageFlag = this.pcFlag;
  @action changePcpage = (flag) => {
    this.pageFlag = flag;
  }
  //
  // pc/h5页面数据列表
  pcFloorList = pcFloorList;
  h5FloorList = h5FloorList;
  @action resetFloorData = ()=>{
    this.pcFloorList.length = 0;
    this.h5FloorList.length = 0;
  }
  get baseChildItem() {
    const id = new Date().getTime()
    return {
      name: '',
      id: id,
      props: {
        styles: {},
        id
      },
    }
  }
  get baseFloorItem() {
    const baseName = this.pageFlag == this.pcFlag ? 'PcBaseBox' : 'H5BaseBox';
    return {
      name: baseName,
      children: [],
      id: new Date().getTime(),
      props: {
        styles: {}
      }
    }
  }

  //获取页面json数据
  get html_json(){
    return {
      h5:h5FloorList,pc:pcFloorList
    }
  }
  // floordata
  get floorList() {
    return this.pageFlag === this.pcFlag ? pcFloorList : h5FloorList;
  }
  @action preview = ()=>{
    localStorage.setItem('html_json',JSON.stringify(this.html_json))
  }
  //楼层数据 模块名 ，id，props
  //插入楼层 direction = up/down 
  @action insertFloor = (direction = 'up', inserFloorId) => {
    const index = this.floorList.findIndex(floor => floor.id === inserFloorId);
    if (direction === 'up') {//向上增加
      console.log('向上增加 --index', index);
      const insertFloorIdx = index;
      this.floorList.splice(insertFloorIdx, 0, this.baseFloorItem)
    } else {//向下增加

    }
  }
  //增加楼层
  @action addFloor = (floor) => {
    console.log('增加楼层');
    this.floorList.push(floor);
  }
  //删除楼层
  @action delFloor = (floorId) => {
    console.log('删除楼层');
    const index = this.floorList.findIndex(floor => floor.id === floorId);
    this.floorList.splice(index, 1);
  }
  //添加楼层子组件
  @action addFloorChild = (floorId, children) => {
    this.floorList.forEach(floor => {
      if (floor.id === floorId) {
        floor.children.push(children);
      }
    })
  }
  //更新 数据props 属性
  @action updateDataProps = (key,newData) => {
    this.floorList.forEach(floor => {
      const { id, children } = floor;
      if (id === this.slectedFloorId) {
        if (this.slectedFloorId && this.seletedChildId) {//更新楼 组件属性 props
          children.forEach(child=>{
            if(child.id === this.seletedChildId){
              child.props[key] = newData;
            }
          })
        }else{ //更新 楼层属性 props
          floor.props[key] = newData;
        }
      }
    })
  }
  //移动楼层  direction = up/down  
  @action moveFloor = (direction, floorId) => {
    console.log('移动楼层 ');
    const floorLength = this.floorList.length;
    const index = this.floorList.findIndex(floor => floor.id === floorId);
    
    let inserIndex = '';
    // 再插入
    if (direction === 'up') {//上移动
      if (index <= 0) return;//第一个不可移动
      inserIndex = index - 1;
    } else {//下移动
      if (index >= floorLength) return;
      inserIndex = index + 1;
    }
    // 先删除
    const moveFloor = this.floorList.splice(index, 1);
    const insertFloorData = moveFloor[0];
    inserIndex !== undefined && this.floorList.splice(inserIndex, 0, insertFloorData)

  }
  //选中楼层 id 
  @observable slectedFloorId = '';
  @action setSelectedFloorId = (floorId) => {
    this.slectedFloorId = floorId;
    this.seletedChildId = '';
  }
  //获取选中楼层
  get selectedFloor() {
    return this.floorList.find(floor => floor.id == this.slectedFloorId) || {};
  }
  //选中当个组件id
  @observable seletedChildId = '';
  @action setSeletedChildId = (childId, floorId) => {
    this.seletedChildId = childId;
    this.slectedFloorId = floorId;
  }
  //获取选中楼层 子组件数据
  get seletedFloorChild() {
    if (!this.slectedFloorId) return '';
    return this.selectedFloor.children && this.selectedFloor.children.find(child => child.id == this.seletedChildId) || '';
  }
  //获取选中数据 选中楼层子组件，返回子组件数据，单单选中楼层，显示楼层数据
  get seletedData() {
    return (this.slectedFloorId && this.seletedChildId) ? this.seletedFloorChild : this.selectedFloor;
  }

}
export default CreateStore;