import React from 'react';
import styled from 'styled-components';
const FlexBox = styled.div(({ styles }) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        // paddingTop: '80px',
        // paddingBottom: '40px',
        ...styles
    }
})
const FlexItem = styled.div({
    flex: '1',
    flexShrink: 0,
    padding: '0 20px',
    textAlign: 'center',
    maxWidth: '196px',
})
const IconItem = styled.a(({ href }) => {
    return {
        display: 'inline-block',
        borderRadius: '50%',
        cursor: href ? 'pointer' : 'default'
    }
})
const Img = styled.img({
    width: '100%'
})
const IconTxt = styled.div(({fontSize='18px',textAlign='center'}) => {
    return {
        paddingTop: '20px',
        fontFamily: 'Roboto-Medium',
        lineHeight: 1,
        fontSize,
        textAlign
    }
})
const defaultItem = {
    iconSrc: 'https://df5apg8r0m634.cloudfront.net/images/f459db064c334f3ddc5561aafa6266c4.png',
    text: "Women's Glasses",
    href: ''
}
function PcIconColumn({ list = [defaultItem, defaultItem, defaultItem], styles = {} }) {
    return (
        <FlexBox styles={styles}>
            {
                list.map((item, idx) => {
                    const { iconSrc, text, href } = item;
                    return (
                        <FlexItem key={idx}>
                            <IconItem href={href ? href : ''} onClick={(e) => { !href && e.preventDefault() }} target='_blank'>
                                <Img src={iconSrc || defaultItem.iconSrc} />
                            </IconItem>
                            <IconTxt fontSize={styles.fontSize} textAlign={styles.textAlign}>{text || defaultItem.text}</IconTxt>
                        </FlexItem>
                    )
                })
            }
        </FlexBox>
    )
}

export default PcIconColumn;