import React, { Fragment } from 'react';
import styled from 'styled-components';
import PageLeft from './PageLeft';
import PageMid from './PageMid';
import PageRight from './PageRight';
const ContentWrap = styled.div({
    display: 'flex',
    height:'100%'
})
function Page() {
    return (
        <Fragment>
            <ContentWrap>
                <PageLeft />
                <PageMid />
                <PageRight />
            </ContentWrap>
        </Fragment>
    );
}

export default Page;