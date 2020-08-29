

import React from 'react';
import styled from 'styled-components';

const Container = styled.div(({styles})=>({
    ...styles
}))


function H5Container({styles = {},children}) {
    return (
        <Container styles={{padding:"0 10px",marginTop:'20px',...styles}}>
            {children}
        </Container>
    )
}

export default H5Container;