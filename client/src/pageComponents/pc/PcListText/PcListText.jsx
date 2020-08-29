// pc 文本列

import React from 'react';
import styled from 'styled-components';
const ListWrap = styled.ul(({boxWidth,styles}) => {
    return {
        width:`${boxWidth}%`,
        margin:'0 auto',
        boxSizing:'border-box',
        padding:0,
        ...styles
    }
});
const ListItem = styled.li(({hasOrder,styles}) => {
    const {color,fontSize} = styles;
    const newStyle = {
        color,
        fontSize,
    }
    return {
        fontSize: '14px',
        color: '#333',
        lineHeight: '1.5',
        position: 'relateive',
        // listStyle:hasOrder ? 1 : 'decimal',
        fontFamily:'Roboto-Regular',
        listStyle: 'none',
        ...newStyle
    }
});
const DotDiv = styled.div({
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#000',
    marginRight: '5px',
    marginBottom: '2px'
})
const NumDiv = styled.div({
    display: 'inline-block',
    marginRight: '5px'
})
function PcListText({ list = [''], styles = {},hasOrder,boxWidth='100' }) {
    return (
        <ListWrap boxWidth={boxWidth} styles={styles}>
            {
                list.map((item, idx) => {
                    return <ListItem key={idx} hasOrder={hasOrder} styles={styles}>
                        {hasOrder ? <DotDiv /> : <NumDiv>{idx + 1}.</NumDiv>}{item || '请输入文本'}
                    </ListItem>
                })
            }
        </ListWrap>
    )
}

export default PcListText;