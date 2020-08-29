import React from 'react';
import styled from 'styled-components';
const Box = styled.div((props) => {
    return {
        ...props.styles
    }
})
function BaseBox({ children = '' ,styles={}}) {
    return <Box styles={styles}>{children}</Box>
}

export default BaseBox;