import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, TextArea,Input ,FlexLine} from '../../../style';
import { CheckBox } from '../../../components/index';
import styled from 'styled-components';
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
class EditH5Rule extends Component {
    handleInput = (e) => {
        //需要更新单个楼层
        const { value,name} = e.target
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps(name,value);
        }
    }

    renderGroup = (data,index)=>{
       return(
        <GroupBox>
            <ContentTitle>文本{`${index + 1}`}：</ContentTitle>
            <TextArea style={{width:'80%'}} value={data} onChange={(e)=>{
                const {ruleList = [1,2]} = this.props;
                let list = [...ruleList]
                list[index] = e.target.value
                const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
                if(seletedFloorChild && seletedChildId){
                    updateDataProps('ruleList',list);
                }
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
        const {ruleList = [1,2]} = this.props;
        let list = [...ruleList]
        list.splice(index,1)
        
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('ruleList',list);
        }
    }
    // 增加数据
    addData = ()=>{
        const {ruleList = [1,2]} = this.props;
        let list = [...ruleList]
        list.push('规则')
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps('ruleList',list);
        }
    }
    render() {
        const {ruleTitle = 'xxxxxx',ruleText='规则说明', ruleList = [1,2],hasNoNumList} = this.props;
        const {updateDataProps } = this.props.createStore;
        return (
            <div>
                <ContentTitle>链接按钮文本:</ContentTitle>
                <Input 
                    type="text" 
                    placeholder='输入标题' 
                    onChange={this.handleInput} 
                    value={ruleText}
                    name='ruleText'
                    style={{width:'80%'}}
                />
                <ContentTitle>弹窗标题:</ContentTitle>
                <Input 
                    value={ruleTitle} 
                    name='ruleTitle'
                    placeholder='输入弹窗标题' 
                    style={{width:'80%',marginBottom:'20px'}}
                    onChange={this.handleInput} 
                />
                <FlexLine justify="flex-start" style={{ marginBottom: '10px' }}>
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox checked={!!hasNoNumList} onChange={(e) => {
                            updateDataProps('hasNoNumList', e.target.checked);
                        }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>无序列表</ContentTitle>
                </FlexLine>
                {
                    ruleList.map((item,index)=>(
                        <React.Fragment key={index}>
                            {this.renderGroup(item,index)}
                        </React.Fragment>
                    ))
                }
                 <AddBtn onClick={this.addData}>增加</AddBtn>
            </div>
        )
    }
}

export default EditH5Rule;