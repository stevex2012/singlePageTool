import React from 'react';
import styled from 'styled-components';

const Div = styled.div((props)=>{
    return {
        height:'10px',
        ...props
    }
})

function WhiteSpace({height='10px'}){
    return <Div height={height}/>
}

export default WhiteSpace;