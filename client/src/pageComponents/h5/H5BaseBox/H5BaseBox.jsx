import React from 'react';
import styled from 'styled-components';
const Box = styled.div(({styles}) => {
    return {
        ...styles,
        "@media screen and (min-width: 768px)":{
            display:'none'
        }
    }
})
function H5BaseBox({ children = '' ,styles={}}) {
    return <Box styles={{padding:"0 10px",marginTop:'20px',...styles}}>{children}</Box>
}

export default H5BaseBox;