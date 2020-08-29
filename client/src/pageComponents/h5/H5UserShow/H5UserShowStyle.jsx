import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, FlexLine,Input } from '../../../style';
import {  CheckBox } from '../../../components/index';


@inject('createStore')
@observer

class H5UserShowStyle extends Component {
    render() {
        const { autoPlay,color,cardBgColor } = this.props;
        const { updateDataProps } = this.props.createStore;
        return (
            <Fragment>
                <FlexLine justify="flex-start">
                    <div style={{ 'width': '15px', marginRight: '10px' }} >
                        <CheckBox
                            checked={!!autoPlay}
                            onChange={(e) => {
                                updateDataProps('autoPlay', e.target.checked);
                            }} />
                    </div>
                    <ContentTitle style={{ margin: 0 }}>自动播放</ContentTitle>
                    </FlexLine>
                    <ContentTitle>颜色:</ContentTitle>
                    <FlexLine justify='space-between'>
                        <Input type="color" name='color' onChange={(e) => updateDataProps('color', `${e.target.value}`)} style={{ width: '30px', padding: '5px' }} />
                        <Input type="text" name='color' placeholder={'选中卡片背景颜色/输入卡片背景颜色'} value={color || ''} onChange={(e) => updateDataProps('color', `${e.target.value}`)} />
                    </FlexLine>
                    <ContentTitle>卡片背景颜色:</ContentTitle>
                    <FlexLine justify='space-between'>
                        <Input type="color" name='cardBgColor' onChange={(e) => updateDataProps('cardBgColor', `${e.target.value}`)} style={{ width: '30px', padding: '5px' }} />
                        <Input type="text" name='cardBgColor' placeholder={'选中卡片背景颜色/输入卡片背景颜色'} value={cardBgColor || ''} onChange={(e) => updateDataProps('cardBgColor', `${e.target.value}`)} />
                    </FlexLine>
            </Fragment>
        )
    }
}
export default H5UserShowStyle;