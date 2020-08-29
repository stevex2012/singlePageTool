//H5 标题
import React from 'react';
import styled from 'styled-components';
import H5Container from "../H5Container";

const Div = styled.div((props)=>{
    return {
        fontSize: '18px',
        lineHeight:'1.35',
        textAlign: 'center',
        color: '#333',
        margin:'0 auto',
        fontFamily:'Roboto-Medium',
        ...props.styles
    }
})
function H5Title({title="H5 标题",proportion = 100,styles={}}) {
    const { color = '#333', fontSize='18px', textAlign = 'center', fontWeight = 400 ,fontStyle,textDecoration } = styles

    return (
        <React.Fragment>
            <Div styles={{width:`${proportion}%` ,color, fontSize, textAlign, fontWeight,fontStyle,textDecoration}}><b>{title}</b></Div>
        </React.Fragment>
    )
}
export default H5Title;