import React from 'react';
import styled from 'styled-components';
const Box = styled.div(({ styles }) => {
    return {
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        paddingBottom: '40px',
        paddingTop: '40px',
        ...styles,
        "@media screen and (max-width: 768px)": {
            display: 'none'
        }
    }
});
function PcBaseBox({ children = '', styles = {} }) {
    return <Box styles={{ ...styles, background: styles.backgroundColor }}>{children}</Box>
}

export default PcBaseBox;