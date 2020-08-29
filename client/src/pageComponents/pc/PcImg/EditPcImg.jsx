import React, { Component, Fragment } from 'react';
import { ContentTitle, FlexLine, Input, TextArea, Button } from '../../../style';
import { inject, observer } from 'mobx-react';
@inject('createStore')
@observer
class EditPcImg extends Component {
    changeBoxWidth = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('boxWidth', e.target.value);
    }
    changeImgSrc = (e) => {
        const { updateDataProps } = this.props.createStore;
        const val = e.target.value;
        // if(!/.jpg|.png|webp/.test(val)) return;
        updateDataProps('imgSrc', val);
    }
    changeHref = (e) => {
        const { updateDataProps } = this.props.createStore;
        updateDataProps('href', e.target.value);
    }
    render() {
        const { boxWidth = '100', imgSrc = '', href='' } = this.props;
        return (
            <Fragment>
                <ContentTitle>图片链接：</ContentTitle>
                <Input
                    value={`${imgSrc}`}
                    type='text'
                    placeholder='输入图片链接'
                    style={{ width: '100%',boxSizing:'border-box' }}
                    onChange={this.changeImgSrc}
                />
                <ContentTitle>跳转链接：</ContentTitle>
                <Input
                    value={`${href}`}
                    type='text'
                    placeholder='输入图片跳转跳转链'
                    style={{ width: '100%',boxSizing:'border-box' }}
                    onChange={this.changeHref}
                />
                <FlexLine justify='space-between'>
                    <ContentTitle>内容占比:</ContentTitle>
                    <FlexLine justify='flex-start' style={{ width: 'auto' }}>
                        <Input
                            value={`${boxWidth}`}
                            type='number'
                            style={{ marginRight: '5px', width: '50px' }}
                            onChange={this.changeBoxWidth} /> %
                    </FlexLine>
                </FlexLine>
            </Fragment>
        )
    }
}

export default EditPcImg;