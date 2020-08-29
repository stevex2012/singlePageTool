import React,{ Component } from "react";
import styled from 'styled-components'
import MyModal from '../Modal'
import { FlexLine,Button } from "../../style";

const ModalContainer = styled.div({
    width:'500px',
    height:'200px',
    background:'#fff'
})

const Input = styled.input({
  border:'1px solid #e4e4e4',
  padding:'15px',
  width:'300px',
  background:'#fff',
  borderRadius:'4px',
  paddingRight: '30px'
})  

class CreateTemplateModal extends Component{

    state = {
        name: this.props.reNameItem.name || ''
    }

    onChange = (e)=>{
        this.setState({
            name:e.target.value
        })
    }

    onSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.name){
            return
        }
        this.props.onSubmi({name:this.state.name,id:this.props.reNameItem.id})
    }
    render() {
        const {visible, onClose,onSubmi,reNameItem} = this.props
        return (
            <MyModal visible={visible} onClose={onClose}>
                <form onSubmit={this.onSubmit}>
                    <FlexLine style={{width:'500px',height:'200px',background:'#fff'}} column={true}>
                        <Input value={this.state.name} placeholder='专题页url+方案名' onChange={this.onChange}/>
                        <Button 
                            onClick={()=>{
                                if(!this.state.name){
                                    return
                                }
                                onSubmi({name:this.state.name,id:reNameItem.id})
                            }}
                            disable={!this.state.name}
                            style={{marginTop:'30px',width:'120px'}}>
                            {reNameItem.id ? '提交' : '创建'}</Button>
                    </FlexLine>
                </form>
            </MyModal>     
        );
    }
}

export default CreateTemplateModal