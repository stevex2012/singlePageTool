import React, { Component, Fragment } from 'react';
import { Select, WhiteSpace, CheckBox } from '../../components/index';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FlexLine, ContentTitle, Input } from '../../style';
const Item = styled.div((props) => {
    return {
        display: 'flex',
        alignItems: 'center'
    }
})
const ItemTitle = styled.div((props) => {
    return {

    }
})
const InputBox = styled.div(({ styles = {} }) => {
    return {
        ...styles
    }
});

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
    //编辑颜色
    editColor(color) {
        return (
            <Fragment>
                <ContentTitle>颜色:</ContentTitle>
                <FlexLine justify='space-between'>
                    <Input
                        value={color}
                        type="color"
                        name='backgroundColor'
                        onChange={(e) => this.handleRefreshStyle('color', e.target.value)}
                        style={{ width: '30px', padding: '5px' }} />
                    <Input type="text" name='backgroundColor' placeholder={'选择颜色/输入颜色'} value={color || ''} onChange={(e) => this.handleRefreshStyle('color', e.target.value)} />
                </FlexLine>
            </Fragment>
        )
    }
    //编辑字号
    editFontSize(fontSize) {
        return (
            <Fragment>
                <FlexLine
                    justify='space-between'
                >
                    <ContentTitle>字号:</ContentTitle>
                    <div style={{ 'width': '50%' }}>
                        <Select
                            placeholder={'选择字体'}
                            defaultValue={fontSize ? { value: fontSize, label: fontSize } : ''}
                            options={this.fontSizeOptions}
                            onChange={(data) => {
                                this.handleRefreshStyle('fontSize', data.value)
                            }}
                        />
                    </div>
                </FlexLine>
            </Fragment>
        )
    }
    //对齐方式
    eidtTextAlign(textAlign) {
        return (
            <Fragment>
                <FlexLine
                    justify='space-between'
                >
                    <ContentTitle>对齐:</ContentTitle>
                    <div style={{ 'width': '50%' }}>
                        <Select
                            placeholder={'选择对齐方式'}
                            defaultValue={this.fontAlignOptions.find(item => item.value == textAlign) || ''}
                            options={this.fontAlignOptions}
                            onChange={(data) => {
                                this.handleRefreshStyle('textAlign', data.value)
                            }}
                        />
                    </div>
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
        const { color, fontSize, textAlign, fontWeight, fontStyle, textDecoration } = styles;
        return (
            <Fragment>
                {/* 颜色 */}
                {!notShowStyles.includes('color') && this.editColor(color)}
                <WhiteSpace />
                {/* 字号 */}
                {!notShowStyles.includes('fontSize') && this.editFontSize(fontSize)}
                <WhiteSpace />
                {/* 对齐 */}
                {!notShowStyles.includes('textAlign') && this.eidtTextAlign(textAlign)}
                <WhiteSpace />
                {/* 粗体 */}
                {
                    !notShowStyles.includes('fontWeight') && <FlexLine
                        justify='space-between'
                    >
                        <ContentTitle>粗体:</ContentTitle>
                        <div style={{ 'width': '20%' }}>
                            <CheckBox
                                checked={fontWeight == 'bold'}
                                onChange={(e) => {
                                    this.handleRefreshStyle('fontWeight', e.target.checked ? 'bold' : 'normal')
                                }} />
                        </div>
                    </FlexLine>
                }
                <WhiteSpace />
                {/* 斜体 */}
                {
                    !notShowStyles.includes('fontStyle') && <FlexLine
                        justify='space-between'
                    >
                        <ContentTitle>斜体:</ContentTitle>
                        <div style={{ 'width': '20%' }}>
                            <CheckBox
                                checked={fontStyle == 'italic'}
                                onChange={(e) => {
                                    this.handleRefreshStyle('fontStyle', e.target.checked ? 'italic' : 'normal')
                                }} />
                        </div>
                    </FlexLine>

                }
                <WhiteSpace />
                {/* 下划线 */}
                {
                    !notShowStyles.includes('textDecoration') && <FlexLine
                        justify='space-between'
                    >
                        <ContentTitle>下划线:</ContentTitle>
                        <div style={{ 'width': '20%' }}>
                            <CheckBox
                                checked={textDecoration == 'underline'}
                                onChange={(e) => {
                                    this.handleRefreshStyle('textDecoration', e.target.checked ? 'underline' : 'normal')
                                }} />
                        </div>
                    </FlexLine>
                }

                <WhiteSpace />
            </Fragment>
        )
    }
}

export default EditBaseBox;
