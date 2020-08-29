import React ,{Component} from 'react';
import mockData from "./mockData";

import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ContentTitle,Input,RemindText } from '../../../style';

const GroupBox = styled.div({
    padding:'10px',
    border:'1px solid #333',
    marginBottom:'10px'
})

@inject('createStore')
@observer
class EditH5Icon3Row extends Component{
    handleInput = (data,index) => {
        //需要更新单个楼层
        const {iconRow = mockData} = this.props;
        let list = [...iconRow]
        list[index] = data
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps('iconRow',list);
        }
    }
    renderIconRowGroup = (data,index)=>{
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
            </GroupBox>
        )
    }
    render(){
        const {iconRow = mockData} = this.props;
        return(
            <div>
                {
                    iconRow.map((item,index)=>(
                        <React.Fragment>{this.renderIconRowGroup(item,index)}</React.Fragment>
                    ))
                }
            </div>
        )
    }
}   

export default EditH5Icon3Row;