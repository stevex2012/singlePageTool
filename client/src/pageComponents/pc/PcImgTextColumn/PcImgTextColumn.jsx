import React from 'react';
import styled from 'styled-components';
const Img = styled.img({
    width: '100%'
})
const FlexBox = styled.div(({ styles = {} }) => {
    return {
        display: 'flex',
        // paddingTop: '54px',
        // paddingBottom: '41px',
        ...styles
    }
})
const FlexItem = styled.div({
    flex: '1',
    flexShrink: '0',
    marginRight: '20px',
    ':last-child': {
        marginRight: 0
    },
})
const Title = styled.div(({ color }) => {
    return {
        textAlign: 'center',
        color: '#333',
        fontSize: '18px',
        lineHeight: 1,
        padding: '17px 0 10px',
        fontFamily:'Roboto-Medium',
        color
    }
})
const P = styled.div(({ color }) => {
    return {
        color: '#333',
        fontSize: '14px',
        fontFamily: 'Roboto-Light',
        lineHeight: '19px',
        padding: '0 29px',
        textAlign: 'justify',
        color:'#333',
        color
    }
})
const defaultItem = {
    imgSrc: 'https://df5apg8r0m634.cloudfront.net/images/4a52918906ecfd4d48de19547a04813f.jpg',
    title: 'Choose your plan',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal. ',
    href: ''
}
//最少2栏，最多3栏
function PcImgTextColumn({ list = [defaultItem, defaultItem], styles }) {
    const { color } = styles;
    return (
        <FlexBox styles={styles}>
            {
                list.map((item, idx) => {
                    const {
                        imgSrc,
                        title,
                        text,
                        href
                    } = item
                    return (
                        <FlexItem key={idx}>
                            <a
                                href={href ? href : ''}
                                onClick={(e) => { !href && e.preventDefault() }}
                                target='_blank'
                                style={{ cursor: href ? 'pinter' : 'default' }}>
                                <Img src={imgSrc || defaultItem.imgSrc} />
                            </a>
                            <Title color={color}><b>{title || defaultItem.title}</b></Title>
                            <P color={color}>{text || defaultItem.text}</P>
                        </FlexItem>
                    )
                })
            }
        </FlexBox>
    )
}

export default PcImgTextColumn;