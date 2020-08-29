import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Input,ContentTitle,FlexLine } from "../../style";

const SpanText = styled.div({
    color:'#333',
    fontSize:'12px',
    textAlign:'center'
})

@inject('createStore')
@observer
class BaseStyle extends Component {
    handleInput = (e)=>{
        //更新某个组件，或则楼层样式属性
        const { seletedData, updateDataProps } = this.props.createStore;
        const { props } = seletedData;
        const { styles } = props;
        let updataData = { ...styles };
        let val =  e.target.value
        if(e.target.type === 'number'){
            if(val > 100){
                val = 100
            }
            if(val < -100){
                val = -100
            }
            val = val + 'px'
        }
        updataData[e.target.name] =  val
        updateDataProps('styles', updataData);
    }
    getNumFromPx = (val) => {
        return `${val}`.split('px')[0];
    }
    //字号，字体颜色，行高，对其方式，字体样式，背景色，内距，外距，边框
    render() {
        const { seletedData } = this.props.createStore;
        const { props } = seletedData;
        const { styles } = props;
        let {
            backgroundColor,
            marginTop = '20px',
            marginBottom = '0px',
            marginLeft = '0px',
            marginRight = '0px',
            paddingTop = '0px',
            paddingLeft = '10px',
            paddingRight = '10px',
            paddingBottom = '0px'
        } = styles
        return (
            <div>
                <ContentTitle>背景颜色:</ContentTitle>
                <FlexLine justify='space-between'>
                    <Input type="color" name='backgroundColor' onChange={this.handleInput} style={{width:'30px',padding:'5px'}}/>
                    <Input type="text" name='backgroundColor' placeholder={'选中颜色/输入颜色'} value={backgroundColor || ''} onChange={this.handleInput} />
                </FlexLine>
                <ContentTitle>内距:</ContentTitle>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input 
                            type='number' 
                            name='paddingTop' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(paddingTop) || ''}
                        />
                        <SpanText>上</SpanText>
                    </div>
                    <div>
                        <Input 
                            type='number' 
                            name='paddingBottom' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(paddingBottom) || ''}
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
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} value={this.getNumFromPx(paddingLeft) || ''}
                        />
                        <SpanText>左</SpanText>
                    </div>
                    <div>
                        <Input 
                            type='number' 
                            name='paddingRight' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(paddingRight) || ''}
                        />
                        <SpanText>右</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
                <ContentTitle>外距:</ContentTitle>
                <FlexLine justify='flex-start'>
                    <div>
                        <Input 
                            type='number' 
                            name='marginTop' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(marginTop) || ''}
                        />
                        <SpanText>上</SpanText>
                    </div>
                    <div>
                        <Input 
                            type='number' 
                            name='marginBottom' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(marginBottom) || ''}
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
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(marginLeft) || ''}
                        />
                        <SpanText>左</SpanText>
                    </div>
                    <div>
                        <Input 
                            type='number' 
                            name='marginRight' 
                            style={{width:'40px',margin:'5px',paddingRight:'0'}}
                            onChange={this.handleInput} 
                            value={this.getNumFromPx(marginRight) || ''}
                        />
                     <SpanText>右</SpanText>
                    </div>
                    <span>px</span>
                </FlexLine>
            </div>
        )
    }
}

export default BaseStyle;
