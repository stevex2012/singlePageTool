import React ,{Component} from 'react';
import { inject, observer } from 'mobx-react';
import { TextArea,ContentTitle, FlexLine,Input } from '../../../style';
@inject('createStore')
@observer
class EditH5Text extends Component{

    handleInput = (e) => {
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){//选中楼层子组件，优先更新子组件
            updateDataProps('text',e.target.value);
        }
    }

    proportionChange = (e)=>{
        const { updateDataProps } = this.props.createStore;
        updateDataProps('proportion',e.target.value);
    }
    render(){
        const {text = 'H5 文本',proportion = 100} = this.props;
        return(
            <div>
                <ContentTitle>文本:</ContentTitle>
                <TextArea 
                    placeholder='输入文本' 
                    onChange={this.handleInput} 
                    value={text}
                    style={{width:'100%'}}
                />
                <FlexLine justify='space-between'>
                    <ContentTitle>内容占比:</ContentTitle>
                    <FlexLine justify='flex-start' style={{width:'auto'}}>
                        <Input 
                            value={`${proportion}`} 
                            type='number' 
                            style={{marginRight:'5px',width:'50px'}}
                            onChange={this.proportionChange}/> %
                    </FlexLine>
                </FlexLine>
            </div>
        )
    }
}   

export default EditH5Text;