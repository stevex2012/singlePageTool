import React ,{Component} from 'react';
import { inject, observer } from 'mobx-react';
import { RemindText,ContentTitle, FlexLine,Input } from '../../../style';
@inject('createStore')
@observer
class EditH5Img extends Component{
    handleInput = (e) => {
        const {seletedFloorChild,seletedChildId,updateDataProps } = this.props.createStore;
        if(seletedFloorChild && seletedChildId){
            updateDataProps(e.target.name,e.target.value);
        }
    }

    proportionChange = (e)=>{
        const { updateDataProps } = this.props.createStore;
        updateDataProps('proportion',e.target.value);
    }

    render(){
        const {src = 'https://df5apg8r0m634.cloudfront.net/images/0d5faf98e226c01377ab4a8cc529a504.png',proportion = 100,link=''} = this.props;
        return(
            <div>
                <ContentTitle>图片地址:</ContentTitle>
                <Input 
                    placeholder='输入图片地址' 
                    onChange={this.handleInput} 
                    value={src}
                    name = {'src'}
                    style={{width:'100%'}}
                />
                <RemindText>图片大小最好不超过200KB</RemindText>
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
                <ContentTitle>跳转链接:</ContentTitle>
                <Input 
                    placeholder='输入图片地址' 
                    onChange={this.handleInput} 
                    value={link}
                    name = {'link'}
                    style={{width:'100%'}}s
                 />
            </div>
        )
    }
}   

export default EditH5Img;