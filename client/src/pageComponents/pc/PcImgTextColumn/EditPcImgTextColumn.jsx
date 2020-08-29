import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ContentTitle, Input, TextArea, Button } from '../../../style';
import { WhiteSpace, DeleteIcon } from '../../../components/index';
const ListItem = {
    imgSrc: '',
    title: '',
    text: '',
    href: ''
};
const DEFALUTLISTS = [{...ListItem},{...ListItem}];
const Item = styled.div({
    border: '1px solid #000',
    padding: '10px',
    position: 'relative',
})
@inject('createStore')
@observer
class EditPcImgTextColumn extends Component {
    handleAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList.push({...ListItem});
        updateDataProps('list',newList)
    };
    handleDelItem=(idx)=>{
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList.splice(idx,1);
        updateDataProps('list',newList)
    }
    handleRefreshItem=(idx,key,val)=>{
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList[idx][key] = val;
        updateDataProps('list',newList)
    }
    render() {
        const { list = DEFALUTLISTS } = this.props;
        const isCanDel = list.length > 2;
        return (
            <Fragment>
                {
                    list.map((item, idx) => {
                        const { imgSrc, title, text, href } = item;
                        const orderNum = idx + 1;
                        return (
                            <Fragment key={idx}>
                                <Item >
                                    {isCanDel && <DeleteIcon style={{position:'absolute',right:'5px',top:'5px'}} onClick={()=>this.handleDelItem(idx)}/>}
                                    <ContentTitle>图片链接地址{orderNum}</ContentTitle>
                                    <Input
                                        value={imgSrc}
                                        placeholder={'输入图片地址'}
                                        onChange={(e)=>this.handleRefreshItem(idx,'imgSrc',e.target.value)}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                    <ContentTitle>跳转链接{orderNum}</ContentTitle>
                                    <Input
                                        value={href}
                                        placeholder={'输入图片跳转链接'}
                                        onChange={(e)=>this.handleRefreshItem(idx,'href',e.target.value)}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                    <ContentTitle>标题文本{orderNum}</ContentTitle>
                                    <TextArea
                                        value={title}
                                        placeholder={'输入标题文本'}
                                        onChange={(e)=>this.handleRefreshItem(idx,'title',e.target.value)}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                    <ContentTitle>描述文本{orderNum}</ContentTitle>
                                    <TextArea
                                        value={text}
                                        placeholder={'输入描述文本'}
                                        onChange={(e)=>this.handleRefreshItem(idx,'text',e.target.value)}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </Item>
                                <WhiteSpace />
                            </Fragment>
                        )
                    })
                }
                {/* 增加 */}
                <Button style={{ width: '100px', margin: '0 auto' }} onClick={this.handleAddList}>{'增加一栏'}</Button>
            </Fragment>
        )
    }
}

export default EditPcImgTextColumn;