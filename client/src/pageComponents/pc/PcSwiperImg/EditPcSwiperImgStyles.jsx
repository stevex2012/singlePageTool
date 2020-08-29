import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, FlexLine } from '../../../style';
import {  CheckBox } from '../../../components/index';


@inject('createStore')
@observer

class EditPcSwiperImgStyles extends Component {
    render() {
        const { autoPlay } = this.props;
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
            </Fragment>
        )
    }
}
export default EditPcSwiperImgStyles;