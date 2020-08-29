import React,{ Component } from "react";
import styled from 'styled-components'
import MyModal from '../Modal'
import { FlexLine,Button,SubButton } from "../../style";

const DeleteText = styled.p({
    fontSize:'16px',
    lineHeight:'26px',
    color:'#333',
    textAlign:'center'
})

class DeleteTemplateModal extends Component{

    state = {
        name:''
    }

    onChange = (e)=>{
        this.setState({
            name:e.target.value
        })
    }
    render() {
        const {visible, onClose,onSubmi,name} = this.props
        return (
            <MyModal visible={visible} onClose={onClose}>
                <FlexLine style={{width:'500px',height:'200px',background:'#fff'}} column={true}>
                    <DeleteText>一旦删除，数据不可恢复。<br/>确认删除方案{name}吗?</DeleteText>
                    <FlexLine style={{marginTop:'20px'}}>
                        <Button onClick={onClose}>取消</Button>
                        <SubButton onClick={onSubmi} style={{marginLeft:'30px'}}>确定</SubButton>
                    </FlexLine>
                </FlexLine>
            </MyModal>     
        );
    }
}

export default DeleteTemplateModal