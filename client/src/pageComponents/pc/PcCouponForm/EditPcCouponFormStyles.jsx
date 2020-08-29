import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { ContentTitle, FlexLine } from '../../../style';
import styled from 'styled-components';
const Lable = styled.label({
    margin:'0 10px'
})

@inject('createStore')
@observer

class EditPcCouponFormStyles extends Component {
    render() {
        const { btnBgColor } = this.props;
        const { updateDataProps } = this.props.createStore;
        return (
            <Fragment>
                <ContentTitle>按钮颜色:</ContentTitle>
                <FlexLine justify={'flex-start'}>
                    <Lable>
                        <input name="coupon_btn_color" type="radio" value="#26ABFF"  onChange={()=>updateDataProps('btnBgColor','#26ABFF')} checked={btnBgColor === '#26ABFF' } />
                        蓝色
                    </Lable>
                    <Lable>
                        <input name="coupon_btn_color" type="radio" value="#333" onChange={()=>updateDataProps('btnBgColor','#333')} checked={btnBgColor === '#333' }/>
                        黑色
                    </Lable>
                </FlexLine>
            </Fragment>
        )
    }
}
export default EditPcCouponFormStyles;