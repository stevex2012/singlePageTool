import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ContentTitle, Input, TextArea, Button,RemindText } from '../../../style';
import { DeleteIcon } from '../../../components/index';
const BASEITEM = {
    iconSrc: '',
    text: '',
    href: ''
};
const DEFALUTLISTS = [{ ...BASEITEM }, { ...BASEITEM }, { ...BASEITEM }];
const Item = styled.div({
    border: '1px solid #000',
    padding: '10px',
    position: 'relative',
    marginBottom: '10px'
})
@inject('createStore')
@observer
class EditPcIconColumn extends Component {
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
        const isCanDel = list.length > 3;
        const isCanAdd = list.length < 6;
        return (
            <Fragment>
                {
                    list.map((item, idx) => {
                        const { iconSrc, text, href } = item;
                        const orderNum = idx + 1;
                        return (
                            <Item key={idx}>
                                {isCanDel && <DeleteIcon style={{ position: 'absolute', right: '5px', top: '5px' }} onClick={() => this.handleDelItem(idx)} />}
                                <ContentTitle>图片地址{orderNum}</ContentTitle>
                                <Input
                                    value={iconSrc}
                                    placeholder={'输入图片地址'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'iconSrc', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <RemindText>图片宽高比1:1</RemindText>
                                <ContentTitle>图片跳转链接{orderNum}</ContentTitle>
                                <Input
                                    value={href}
                                    placeholder={'输入图片跳转链接'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'href', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <ContentTitle>描述文本{orderNum}</ContentTitle>
                                <TextArea
                                    value={text}
                                    placeholder={'输入描述文本'}
                                    onChange={(e) => this.handleRefreshItem(idx, 'text', e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                            </Item>
                        );
                    })
                }
                {/* 增加 */}
            {isCanAdd && <Button style={{ width: '100px', margin: '0 auto' }} onClick={this.handleAddList}>{'增加一栏'}</Button> }
            </Fragment>
        )
    }
}

export default EditPcIconColumn;