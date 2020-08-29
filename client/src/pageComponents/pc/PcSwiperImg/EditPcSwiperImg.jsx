import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ContentTitle, Input, Button, RemindText } from '../../../style';
import { DeleteIcon, CheckBox } from '../../../components/index';
const DEFAULTITEM = [
    {
        imgSrc: '',
        href: '',
    },
    {
        imgSrc: '',
        href: '',
    },
    {
        imgSrc: '',
        href: '',
    },
];
const DEFALUTLISTS = [[...DEFAULTITEM], [...DEFAULTITEM]];
const Item = styled.div({
    border: '1px solid #000',
    padding: '10px',
    position: 'relative',
    marginBottom: '10px'
});
const InerItem = styled.div({
    border: '1px dashed #000',
    padding: '10px',
    position: 'relative',
    marginBottom: '10px'
});
@inject('createStore')
@observer
class EditPcSwiperImg extends Component {
    handleAddList = () => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = [...list];
        newList.push([...DEFAULTITEM]);
        updateDataProps('list', newList)
    };
    handleDelItem = (idx) => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        const newList = JSON.parse(JSON.stringify(list));
        newList.splice(idx, 1);
        updateDataProps('list', newList)
    }
    handleRefreshItem = (pidx, chidIdx, key, val) => {
        const { updateDataProps } = this.props.createStore;
        const { list = DEFALUTLISTS } = this.props;
        // const newList = [...list];
        const newList = JSON.parse(JSON.stringify(list));
        newList[pidx][chidIdx][key] = val;
        updateDataProps('list', newList)
    }
    render() {
        const { list = DEFALUTLISTS } = this.props;
        //最少2组
        const showDelBtn = list.length > 2;
        return (
            <Fragment>
                {
                    list.map((item, idx) => {
                        return (
                            <Item key={idx}>
                                <ContentTitle>组{idx + 1}：</ContentTitle>
                                {showDelBtn && <DeleteIcon style={{ position: 'absolute', right: '5px', top: '5px' }} onClick={() => this.handleDelItem(idx)} /> || ''}
                                {item.map((innerItem, index) => {
                                    const { imgSrc, href } = innerItem;
                                    const orderNum = index + 1;
                                    return (
                                        <InerItem key={index}>
                                            <ContentTitle>图片链接{orderNum}</ContentTitle>
                                            <Input
                                                value={imgSrc}
                                                placeholder={'输入图片链接'}
                                                onChange={(e) => this.handleRefreshItem(idx, index, 'imgSrc', e.target.value)}
                                                style={{ width: '100%', boxSizing: 'border-box' }}
                                            />
                                            <RemindText>图片大小最好不超过200KB</RemindText>
                                            <ContentTitle>跳转链接{orderNum}</ContentTitle>
                                            <Input
                                                value={href}
                                                placeholder={'输入跳转链接'}
                                                onChange={(e) => this.handleRefreshItem(idx, index, 'href', e.target.value)}
                                                style={{ width: '100%', boxSizing: 'border-box' }}
                                            />
                                        </InerItem>
                                    );
                                })}
                            </Item>
                        )
                    })
                }
                {/* 增加 */}
                <Button style={{ width: '100px', margin: '0 auto' }} onClick={this.handleAddList}>{'增加一栏'}</Button>
            </Fragment>
        )
    }
}
//是否轮播
export default EditPcSwiperImg;