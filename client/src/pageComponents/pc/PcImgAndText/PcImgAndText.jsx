import React from 'react';
import styled from 'styled-components';
const FlexWrap = styled.div(({ imgLeft, styles }) => {
    return {
        display: 'flex',
        alignItems: 'center',
        flexDirection: imgLeft ? 'row-reverse' : 'row',
        // padding: '80px 0 40px',
        ...styles
    }
});
const FlexItem = styled.div({
    flex: 1,
    flexShrink: 0,
    maxWidth: '50%'
});
const FlexTextWrap = styled.div(({ imgLeft }) => {
    return {
        flex: 1,
        flexShrink: 0,
        maxWidth: '50%',
        boxSizing: 'border-box',
        padding: imgLeft ? '0 20px 0 90px' : '0 90px 0 20px'
    }
})
const Title = styled.div(({ color }) => {
    return {
        color: color || '#333',
        lineHeight: '43px',
        fontSize: '28px',
        fontFamily: 'Roboto-Medium',

    }
});
const Text = styled.div(({ color }) => {
    return {
        fontSize: '14px',
        lineHeight: '19px',
        color: color || '#333',
        paddingTop: '20px',
        textAlign: 'justify',
        fontFamily: 'Roboto-Regular',
    }
});
const ImgBox = styled.div({
    fontSize:0
});
const Img = styled.img({
    width: '100%'
});
const DEFALT_TITLE = 'We Look At The World Straight In The Eye';
const DEFALT_TEXT = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.';
const DEFALT_IMG = 'https://df5apg8r0m634.cloudfront.net/images/d83d5c249c3e77f530fb55da51c4a2e3.jpg';
function PcImgAndText({ title = DEFALT_TITLE, text = DEFALT_TEXT, imgSrc = DEFALT_IMG, imgLeft, styles = {} }) {
    const { color } = styles;
    return (
        <FlexWrap imgLeft={imgLeft} styles={styles}>
            <FlexTextWrap imgLeft={imgLeft}>
                <Title color={color}><b>{title}</b></Title>
                <Text color={color}>{text}</Text>
            </FlexTextWrap>
            <FlexItem>
                <ImgBox>
                    <Img src={imgSrc} />
                </ImgBox>
            </FlexItem>
        </FlexWrap>
    )
}

export default PcImgAndText;