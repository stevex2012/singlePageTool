import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ContentTitle, Input, TextArea, Button,RemindText } from '../../../style';
import { DeleteIcon,CheckBox } from '../../../components/index';
const BASEITEM = {
    imgSrc: '',
    name: "",
    text: ''
};
const DEFALUTLISTS = [{ ...BASEITEM }, { ...BASEITEM }, { ...BASEITEM }, { ...BASEITEM }, { ...BASEITEM }, { ...BASEITEM }];
const Item = styled.div({
    border: '1px solid #000',
    padding: '10px',
    position: 'relative',
    marginBottom: '10px'
})
@inject('createStore')
@observer
class EditPcUserShow extends Component {
    handleDelItem = (idx) => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList.splice(idx, 1);
        updateDataProps('list', newList)
    }
    handleRefreshItem = (idx, key, val) => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList[idx][key] = val;
        updateDataProps('list', newList)
    }
    handleAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList.push({ ...BASEITEM });
        updateDataProps('list', newList)
    };
    render() {
        const { list = DEFALUTLISTS } = this.props;
        const showDeleBtn = list.length > 3;
        return (
            <Fragment>
                {
                    list.map((item, idx) => {
                        const { imgSrc, name, text,href } = item;
                        const orderNum = idx + 1;
                        return (
                            <Item key={idx}>
                                {showDeleBtn && <DeleteIcon style={{ position: 'absolute', right: '5px', top: '5px' }} onClick={() => this.handleDelItem(idx)} /> || ''}
                                <ContentTitle>头像链接{orderNum}</ContentTitle>
                                <Input
                                    value={imgSrc}
                                    placeholder={'输入头像链接'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'imgSrc', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <RemindText>图片宽高比1:1</RemindText>
                                <ContentTitle>用户名{orderNum}</ContentTitle>
                                <Input
                                    value={name}
                                    placeholder={'输入用户名'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'name', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <ContentTitle>评论文本{orderNum}</ContentTitle>
                                <TextArea
                                    value={text}
                                    placeholder={'输入评论文本'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'text', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <ContentTitle>跳转链接{orderNum}</ContentTitle>
                                <Input
                                    value={href}
                                    placeholder={'输入跳转链接'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'href', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                            </Item>
                        );
                    })
                }
                {/* 增加 */}
                <Button style={{ width: '100px', margin: '0 auto' }} onClick={this.handleAddList}>{'增加一栏'}</Button>
            </Fragment>
        )
    }
}

export default EditPcUserShow;