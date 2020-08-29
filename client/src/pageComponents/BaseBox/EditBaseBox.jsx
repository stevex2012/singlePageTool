import React, { Component, Fragment } from 'react';
import { Input, WhiteSpace } from '../../components/index';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FlexLine, ContentTitle } from '../../style';

import FontStyle from "./FontStyle";


const PaddingBox = styled.div({
    width: '100px',
    height: '50px',
    background: '#fff',
    position: 'relative',
    border: '20px solid #f2f2f2'
});
const EditPad = styled.div((props) => {
    return {
        position: 'absolute',
        ...props
    }
})
const SpanText = styled.div({
    color: '#333',
    fontSize: '12px',
    textAlign: 'center'
})
@inject('createStore')
@observer
class EditBaseBox extends Component {
    //获取字号 下拉选项
    get fontSizeOptions() {
        const min = 12;
        const max = 50;
        let tmp = min;
        const result = [];
        while (tmp <= max) {
            result.push({
                value: `${tmp}px`,
                label: `${tmp}px`,
            });
            tmp++;
        }
        return result;
    }
    //字体对其方式
    get fontAlignOptions() {
        return [
            {
                value: 'left',
                label: '左对齐'
            },
            {
                value: 'right',
                label: '右对齐'
            },
            {
                value: 'center',
                label: '居中'
            },
            {
                value: 'justify',
                label: '两端对齐'
            },
        ]
    }
    //根性某个样式
    handleRefreshStyle = (key, value) => {
        //更新某个组件，或则楼层样式属性
        const { seletedData, updateDataProps } = this.props.createStore;
        const { props } = seletedData;
        const { styles } = props;
        let updataData = {
            ...styles,
            [key]: value
        };
        updateDataProps('styles', updataData);
    }
    getNumFromPx = (val) => {
        return `${val}`.split('px')[0];
    }
    editBgColor(backgroundColor) {
        return (
            <Fragment>
                <ContentTitle>背景颜色:</ContentTitle>
                <FlexLine justify='space-between'>
                    <Input type="color" name='backgroundColor' onChange={(e) => this.handleRefreshStyle('backgroundColor', `${e.target.value}`)} style={{ width: '30px', padding: '5px' }} />
                    <Input type="text" name='backgroundColor' placeholder={'选中颜色/输入颜色'} value={backgroundColor || ''} onChange={(e) => this.handleRefreshStyle('backgroundColor', `${e.target.value}`)} />
                </FlexLine>
            </Fragment>
        )
    }
    //内距离
    editPadding(paddingTop='40px', paddingRight, paddingBottom='40px', paddingLeft) {
        console.log('paddingTop',paddingTop);
        console.log('paddingBottom',paddingBottom);
        return (
            <Fragment>
                <ContentTitle>内距:</ContentTitle>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input
                            type='number'
                            name='paddingTop'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('paddingTop', `${e.target.value}px`)} value={this.getNumFromPx(paddingTop)}
                        />
                        <SpanText>上</SpanText>
                    </div>
                    <div>
                        <Input
                            type='number'
                            name='paddingBottom'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('paddingBottom', `${e.target.value}px`)} value={this.getNumFromPx(paddingBottom)}
                        />
                        <SpanText>下</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input
                            type='number'
                            name='paddingLeft'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('paddingLeft', `${e.target.value}px`)} value={this.getNumFromPx(paddingLeft)}
                        />
                        <SpanText>左</SpanText>
                    </div>
                    <div>
                        <Input
                            type='number'
                            name='paddingRight'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('paddingRight', `${e.target.value}px`)} value={this.getNumFromPx(paddingRight)}
                        />
                        <SpanText>右</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
            </Fragment>
        )
    }
    //外距离
    editMargin(marginTop, marginRight, marginBottom, marginLeft) {
        return (
            <Fragment>
                <ContentTitle>外距:</ContentTitle>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input
                            type='number'
                            name='marginTop'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('marginTop', `${e.target.value}px`)} value={this.getNumFromPx(marginTop)}
                        />
                        <SpanText>上</SpanText>
                    </div>
                    <div>
                        <Input
                            type='number'
                            name='marginBottom'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('marginBottom', `${e.target.value}px`)} value={this.getNumFromPx(marginBottom)}
                        />
                        <SpanText>下</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input
                            type='number'
                            name='marginLeft'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('marginLeft', `${e.target.value}px`)} value={this.getNumFromPx(marginLeft)}
                        />
                        <SpanText>左</SpanText>
                    </div>
                    <div>
                        <Input
                            type='number'
                            name='marginRight'
                            style={{ width: '40px', margin: '5px', paddingRight: '0' }}
                            onChange={(e) => this.handleRefreshStyle('marginRight', `${e.target.value}px`)} value={this.getNumFromPx(marginRight)}
                        />
                        <SpanText>右</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
            </Fragment>
        )
    }
    //字号，字体颜色，行高，对其方式，字体样式，背景色，内距，外距，边框
    render() {
        const { seletedData = {} } = this.props.createStore;
        const { props = {} } = seletedData;
        const { styles = {} } = props;
        const { notShowStyles = [] } = this.props;
        const { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft, backgroundColor } = styles;
        return (
            <Fragment>
                <FontStyle {...this.props} notShowStyles={notShowStyles} />
                {!notShowStyles.includes('backgroundColor') && this.editBgColor(backgroundColor)}
                {/* 内距 */}
                {!notShowStyles.includes('padding') && this.editPadding(paddingTop, paddingRight, paddingBottom, paddingLeft)}
                <WhiteSpace />
                {/* 外距 */}
                {!notShowStyles.includes('margin') && this.editMargin(marginTop, marginRight, marginBottom, marginLeft)}
            </Fragment>
        )
    }
}

export default EditBaseBox;
