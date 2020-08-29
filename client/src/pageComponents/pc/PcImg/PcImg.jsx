import React from 'react';
import styled from 'styled-components';
const HrefBox = styled.a(({styles={},boxWidth,href})=>{
    return{
        display:'block',
        fontSize:0,
        margin:'0 auto',
        width:`${boxWidth}%`,
        // padding:'20px 0',
        cursor:href ? 'pointer' : 'default',
        ...styles
    }
})
const Img = styled.img({
    width:'100%'
})
function PcImg({imgSrc='https://df5apg8r0m634.cloudfront.net/images/4ca7c2e83a08d533a1d3997c514b232c.jpg',href,boxWidth,styles}){
    if(!imgSrc) return '';
    return (
        <HrefBox 
        styles={styles} 
        href={href ? href : ''} 
        boxWidth={boxWidth} 
        onClick={(e)=>{!href && e.preventDefault()} } target='_blank'>
            <Img src={imgSrc} />
        </HrefBox>
    )
}

export default PcImg;