// pc 文本
import React from 'react';
import styled from 'styled-components';
const Text = styled.div(({styles,boxWidth}) => { 
    return {
        fontSize: '14px',
        lineHeight: '1.5',
        textAlign: 'left',
        color: '#333',
        width:`${boxWidth}%`,
        fontFamily:'Roboto-Regular',
        margin:'0 auto',
        ...styles
    }
})
function PcText({ text = '文本', styles = {},boxWidth='100' }) {
    return (
        <Text styles={styles} boxWidth={boxWidth}>{text}</Text>
    )
}
export default PcText;