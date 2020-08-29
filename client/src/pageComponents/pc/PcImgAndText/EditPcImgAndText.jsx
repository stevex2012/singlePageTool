import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ContentTitle, Input, TextArea, FlexLine } from '../../../style';
import { CheckBox } from '../../../components/index';
@inject('createStore')
@observer
class EditPcImgAndText extends Component {
    handleCgTitle = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('title', e.target.value);
    }
    handleCgText = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('text', e.target.value);
    }
    handleCgImg = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('imgSrc', e.target.value);
    }
    render() {
        const { title='', text='', imgSrc='', imgLeft='' } = this.props;
        const { updateDataProps } = this.props.createStore;
        return (
            <Fragment>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox
                            checked={!!imgLeft}
                            onChange={(e) => {
                                updateDataProps('imgLeft', e.target.checked);
                            }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>左图右文</ContentTitle>
                </FlexLine>
                <ContentTitle>标题：</ContentTitle>
                <Input
                    value={title}
                    placeholder={'标题'}
                    onChange={this.handleCgTitle}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <ContentTitle>文案描述：</ContentTitle>
                <TextArea
                    value={text}
                    placeholder={'输入文案描述'}
                    onChange={this.handleCgText}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <ContentTitle>图片地址链接：</ContentTitle>
                <Input
                    value={imgSrc}
                    placeholder={'输入图片地址链接'}
                    onChange={this.handleCgImg}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
            </Fragment>
        )
    }
}

export default EditPcImgAndText;