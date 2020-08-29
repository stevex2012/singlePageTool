import React ,{Component} from 'react';
import mockData from "./mockData";

import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ContentTitle,Input,RemindText } from '../../../style';

const GroupBox = styled.div({
    padding:'10px',
    border:'1px solid #333',
    marginBottom:'10px',
    position:'relative'
})

const AddBtn = styled.div({
    width:'120px',
    background:'#333',
    color:"#fff",
    fontSize:'12px',
    height:'32px',
    lineHeight:'32px',
    textAlign:'center',
    cursor:'pointer'
})

const DeleteBtn = styled.div({
    width:'40px',
    height:'40px',
    position:'absolute',
    top:0,
    right:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'20px',
    color:'#333'
})

@inject('createStore')
@observer
class EditH5IconColum extends Component{
    handleInput = (data,index) => {
        //需要更新单个楼层
        const {iconColum = mockData} = this.props;
        let list = [...iconColum]
        list[index] = data
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps('iconColum',list);
        }
    }
    renderIconRowGroup = (data,index)=>{
        const {iconColum = mockData} = this.props;
        const isCanDel = iconColum.length > 2;
        return(
            <GroupBox>
                <ContentTitle>图标链接{`${index + 1}`}：</ContentTitle>
                <Input style={{width:'80%'}} value={data.iconSrc} onChange={(e)=>{
                    let reData ={...data}
                    reData.iconSrc = e.target.value
                    this.handleInput(reData,index)
                }}/>
                <RemindText>图片宽高比1:1</RemindText>
                <ContentTitle>描述文本{index + 1}：</ContentTitle>
                <Input style={{width:'80%'}} value={data.text} onChange={(e)=>{
                    let reData ={...data}
                    reData.text = e.target.value
                    this.handleInput(reData,index)
                }}/>
                {
                    isCanDel  && <DeleteBtn onClick={()=>{this.deleteData(index)}}>
                        <svg t="1592026407837" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4014" width="20" height="20"><path d="M916.945455 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363L81.454545 132.654545c-13.963636-13.963636-13.963636-37.236364 0-51.2 13.963636-13.963636 37.236364-13.963636 51.2 0l812.218182 812.218182c13.963636 13.963636 13.963636 37.236364 0 51.2-9.309091 4.654545-18.618182 9.309091-27.927272 9.309091z" p-id="4015"></path><path d="M107.054545 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363-13.963636-13.963636-13.963636-37.236364 0-51.2L891.345455 81.454545c13.963636-13.963636 37.236364-13.963636 51.2 0 13.963636 13.963636 13.963636 37.236364 0 51.2L132.654545 942.545455c-6.981818 6.981818-16.290909 11.636364-25.6 11.636363z" p-id="4016"></path></svg>
                    </DeleteBtn>
                }
            </GroupBox>
        )
    }
    // 删除数据
    deleteData = (index)=>{
        const {iconColum = mockData} = this.props;
        let list = [...iconColum]
        list.splice(index,1)
        
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('iconColum',list);
        }
    }
    // 增加数据
    addData = ()=>{
        const {iconColum = mockData} = this.props;
        let list = [...iconColum]
        list.push({iconSrc:'https://df5apg8r0m634.cloudfront.net/images/1620b2b39119c96d72e4693b61e3c3ea.png',text:'这是一段文字，这是一段文字，这是一段文字，这是一段文字，这是一段文字'})
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('iconColum',list);
        }
    }
    render(){
        const {iconColum = mockData} = this.props;
        return(
            <div>
                {
                    iconColum.map((item,index)=>(
                        <React.Fragment>{this.renderIconRowGroup(item,index)}</React.Fragment>
                    ))
                }
                <AddBtn onClick={this.addData}>增加</AddBtn>
            </div>
        )
    }
}   

export default EditH5IconColum;