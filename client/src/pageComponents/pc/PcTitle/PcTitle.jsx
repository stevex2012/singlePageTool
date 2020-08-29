//pc 标题
import React from 'react';
import styled from 'styled-components';

const Div = styled.div(({styles,boxWidth})=>{
    return {
        fontSize: '28px',
        lineHeight:'1.5',
        textAlign: 'center',
        color: '#333',
        width:`${boxWidth}%`,
        fontFamily:'Roboto-Medium',
        margin:'0 auto',
        ...styles
    }
});
function PcTitle({title="标题",styles={}, boxWidth='100'}) {
    return (
        <Div styles={styles} boxWidth={boxWidth}>{title}</Div>
    )
}
export default PcTitle;