// H5 文本
import React from 'react';
import styled from 'styled-components';
import H5Container from "../H5Container";


const Text = styled.div((props) => {
    return {
        fontSize: '14px',
        lineHeight: '1.35',
        textAlign: 'left',
        color: '#333',
        margin:'0 auto',
        ...props.styles
    }
})
function H5Text({ text = 'H5 文本',proportion = 100,styles = {} }) {
    
    const { color = '#333', fontSize='14px', textAlign = 'left', fontWeight = 400 ,fontStyle,textDecoration } = styles
    return (
        <React.Fragment>
            <Text styles={{width:`${proportion}%`,color, fontSize, textAlign, fontWeight,fontStyle,textDecoration}}>{text}</Text>
        </React.Fragment>
    )
}

export default H5Text;