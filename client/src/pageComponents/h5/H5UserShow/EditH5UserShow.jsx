import React,{Component} from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ContentTitle,Input,RemindText ,TextArea} from '../../../style';

import mockData from "./mockData";


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
class EditH5UserShow extends Component{
    handleInput = (data,index) => {
        //需要更新单个楼层
        const {userList = mockData} = this.props;
        let list = [...userList]
        list[index] = data
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps('userList',list);
        }
    }

    renderGroup = (data,index)=>{
        return (
            <GroupBox>
                <ContentTitle>头像链接{`${index + 1}`}：</ContentTitle>
                <Input style={{width:'80%'}} value={data.imgSrc} onChange={(e)=>{
                    let reData ={...data}
                    reData.imgSrc = e.target.value
                    this.handleInput(reData,index)
                }}/>
                <RemindText>图片宽高比1:1</RemindText>
                <ContentTitle>链接{index + 1}：</ContentTitle>
                <Input style={{width:'80%'}} value={data.link} onChange={(e)=>{
                    let reData ={...data}
                    reData.link = e.target.value
                    this.handleInput(reData,index)
                }}/>
                <ContentTitle>用户名{index + 1}：</ContentTitle>
                <Input style={{width:'80%'}} value={data.name} onChange={(e)=>{
                    let reData ={...data}
                    reData.name = e.target.value
                    this.handleInput(reData,index)
                }}/>
                <ContentTitle>评论文本{`${index + 1}`}：</ContentTitle>
                <TextArea style={{width:'80%'}} value={data.text} onChange={(e)=>{
                    let reData ={...data}
                    reData.text = e.target.value
                    this.handleInput(reData,index)
                }}/>

                {
                    index > 1 && <DeleteBtn onClick={()=>{this.deleteData(index)}}>
                        <svg t="1592026407837" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4014" width="20" height="20"><path d="M916.945455 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363L81.454545 132.654545c-13.963636-13.963636-13.963636-37.236364 0-51.2 13.963636-13.963636 37.236364-13.963636 51.2 0l812.218182 812.218182c13.963636 13.963636 13.963636 37.236364 0 51.2-9.309091 4.654545-18.618182 9.309091-27.927272 9.309091z" p-id="4015"></path><path d="M107.054545 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363-13.963636-13.963636-13.963636-37.236364 0-51.2L891.345455 81.454545c13.963636-13.963636 37.236364-13.963636 51.2 0 13.963636 13.963636 13.963636 37.236364 0 51.2L132.654545 942.545455c-6.981818 6.981818-16.290909 11.636364-25.6 11.636363z" p-id="4016"></path></svg>
                    </DeleteBtn>
                }
            </GroupBox>
        )
    }

    // 删除数据
    deleteData = (index)=>{
        const {userList = mockData} = this.props;
        let list = [...userList]
        list.splice(index,1)
        
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('userList',list);
        }
    }
    // 增加数据
    addData = ()=>{
        const {userList = mockData} = this.props;
        let list = [...userList]
        list.push({
            imgSrc:'https://df5apg8r0m634.cloudfront.net/images/5610fe3aa56a462b8e575a9eb2dee686.png',
            name:'User Name',
            text:'It is a long established fact that a reader will be distrvacted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal,It is a long established fact that a reader will be distrvacted by the readable content of a page when looking at its layout.'
        })
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('userList',list);
        }
    }

    render(){
        const {userList = mockData} = this.props;
        return (
            <div>
                {
                    userList.map((item,index)=>(
                        <React.Fragment key={index}>{this.renderGroup(item,index)}</React.Fragment>
                    ))
                }
                <AddBtn onClick={this.addData}>增加</AddBtn>
            </div>
        )
    }
}

export default EditH5UserShow;