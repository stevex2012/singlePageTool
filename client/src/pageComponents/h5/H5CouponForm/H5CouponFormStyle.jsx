import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Input,ContentTitle,FlexLine } from "../../../style";

const Lable = styled.label({
    margin:'0 10px'
})

@inject('createStore')
@observer
class H5CouponFormStyle extends Component {
    handleInput = (e)=>{
        //更新某个组件，或则楼层样式属性
        const { seletedData, updateDataProps } = this.props.createStore;
        const { props } = seletedData;
        const { styles } = props;
        let updataData = { ...styles };
        let val =  e.target.value
        
        updataData[e.target.name] =  val
        updateDataProps('styles', updataData);
    }
    render() {
        const { styles } = this.props;
        const { coupon_btn_color = '#26ABFF' } = styles
        return (
            <div>
                <ContentTitle>按钮颜色:</ContentTitle>
                <FlexLine justify={'flex-start'}>
                    <Lable>
                        <input name="coupon_btn_color" type="radio" value="#26ABFF"  onChange={this.handleInput} checked={coupon_btn_color === '#26ABFF' } />
                        蓝色
                    </Lable>
                    <Lable>
                        <input name="coupon_btn_color" type="radio" value="#333" onChange={this.handleInput} checked={coupon_btn_color === '#333' }/>
                        黑色
                    </Lable>
                </FlexLine>
            </div>
        )
    }
}

export default H5CouponFormStyle;
