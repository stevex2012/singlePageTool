import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, FlexLine,Input,TextArea } from '../../../style';
import {WhiteSpace} from '../../../components/index';
@inject('createStore')
@observer
class EditPcTitle extends Component {
    handleInput = (e) => {
        //需要更新单个楼层
        
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps('title',e.target.value);
        }
    }
    proportionChange = (e)=>{
        const { updateDataProps } = this.props.createStore;
        updateDataProps('boxWidth',e.target.value);
    }
    render() {
        const {title = '',boxWidth='100'} = this.props;
        return (
            <div>
                 <ContentTitle>标题:</ContentTitle>
                <TextArea 
                    type="text" 
                    placeholder='输入标题' 
                    onChange={this.handleInput} 
                    value={title}
                    style={{width:'80%',height:"200px"}}
                />
                <WhiteSpace />
                <FlexLine justify='space-between'>
                    <ContentTitle>内容占比:</ContentTitle>
                    <FlexLine justify='flex-start' style={{width:'auto'}}>
                        <Input 
                            value={`${boxWidth}`} 
                            type='number' 
                            style={{marginRight:'5px',width:'50px'}}
                            onChange={this.proportionChange}/> %
                    </FlexLine>
                </FlexLine>
            </div>
        )
    }
}

export default EditPcTitle;